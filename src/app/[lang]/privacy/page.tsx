'use client';

import { useTranslations } from 'next-intl';
import { Card, CardBody } from '@/components/common/Card';

export default function PrivacyPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <Card className="mb-8">
          <CardBody>
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0">Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                At Abdalla Eye Clinic, we are committed to protecting your privacy and ensuring you have a positive experience on our website and when using our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Personal information (name, email, phone)</li>
                <li>Medical history and eye health information</li>
                <li>Appointment preferences</li>
                <li>Insurance information</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Schedule and manage your appointments</li>
                <li>Provide medical services and treatment</li>
                <li>Send appointment reminders and updates</li>
                <li>Improve our services and patient experience</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300">
                You have the right to access, correct, or delete your personal information. Contact us at{' '}
                <a href="mailto:info@abdallaeye.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  info@abdallaeye.com
                </a>
                {' '}to exercise these rights.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                For any questions about this privacy policy, please contact us at:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-900 dark:text-white"><strong>Abdalla Eye Clinic</strong></p>
                <p className="text-gray-700 dark:text-gray-300">Alexandria, Egypt</p>
                <p className="text-gray-700 dark:text-gray-300">Email: info@abdallaeye.com</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
