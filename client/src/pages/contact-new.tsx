import { PageLayout } from "@/components/layout/Layout";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactInfo } from "@/components/business/ContactInfo";

export default function Contact() {
  return (
    <PageLayout
      title="ติดต่อเรา"
      description="มีคำถามหรือต้องการข้อมูลเพิ่มเติม? ติดต่อเราได้ตลอดเวลา"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactForm className="lg:order-1" />
        <ContactInfo />
      </div>
    </PageLayout>
  );
}