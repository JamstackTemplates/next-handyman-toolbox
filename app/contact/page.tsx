import type { Metadata } from 'next';
import { ContactWorkbench } from '../../components/contact-sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <ContactWorkbench
      hosted={hosted}
      siteId={site.jamstacksSite}
      embedUrl={site.jamstacksEmbedUrl}
      heading={business.enquiries.title}
      introduction={business.enquiries.introduction}
      checklistTitle="What to put in your message"
      unconfiguredHeading="Email your job list directly"
      unconfiguredBody="The online enquiry form is not connected on this preview. Send your job list straight to our email address — we reply with a rough estimate and a visit window."
    />
  );
}
