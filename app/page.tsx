import DynamicSubscriptionForm from "@/components/DynamicSubscriptionForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subscription Form</h1>
      <DynamicSubscriptionForm />
    </div>
  );
}

