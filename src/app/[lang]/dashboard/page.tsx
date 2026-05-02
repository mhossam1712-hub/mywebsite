'use client';

import React, { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/common/Button';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Input, Textarea } from '@/components/common/Input';

interface SubmitResult {
  slug: string;
  filePath: string;
}

function makePreview(title: string, content: string) {
  const heading = title.trim() || 'Article title';
  const body = content.trim() || 'Start writing your article content here.';

  return `# ${heading}\n\n${body}`;
}

export default function DashboardPage() {
  const locale = useLocale();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Eye Health');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SubmitResult | null>(null);

  const preview = useMemo(() => makePreview(title, content), [title, content]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, slug, content }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not save article.');
      }

      setResult(data);
      setTitle('');
      setDescription('');
      setCategory('Eye Health');
      setSlug('');
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save article.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-medical-50 px-4 py-10 dark:bg-gray-950 sm:py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <span className="eyebrow mb-4">Blog Dashboard</span>
          <h1 className="text-3xl font-bold leading-tight text-slate-950 dark:text-white sm:text-4xl">
            Add a new article
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-gray-300">
            Create a blog post as an MDX file. This page is hidden from the navbar.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card variant="elevated">
            <CardHeader title="Article details" subtitle="Fill the fields and save the post to the blog folder." />
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: How to prepare for LASIK"
                  required
                />
                <Textarea
                  label="Short description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="One or two sentences for the blog card and SEO."
                  rows={3}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder="Eye Health"
                  />
                  <Input
                    label="Custom slug"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    placeholder="optional-url-slug"
                    hint="Leave empty to create one from the title."
                  />
                </div>
                <Textarea
                  label="Article content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder={`Write in Markdown or MDX.\n\n## Section title\n\n- Helpful point\n- Another point`}
                  rows={14}
                  required
                  className="font-mono text-sm leading-6"
                />

                {error && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-200">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm text-cyan-900 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-100">
                    <p className="font-semibold">Saved to {result.filePath}</p>
                    <Link href={`/${locale}/blog/${result.slug}`} className="mt-1 inline-block font-semibold underline">
                      Open article
                    </Link>
                  </div>
                )}

                <Button type="submit" size="lg" isLoading={isSubmitting}>
                  Save article
                </Button>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Preview draft" subtitle="Markdown preview source before it becomes an MDX article." />
            <CardBody>
              <pre className="max-h-[620px] overflow-auto rounded-lg border border-cyan-100 bg-slate-950 p-4 text-sm leading-6 text-cyan-50 shadow-inner dark:border-cyan-900">
                {preview}
              </pre>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
