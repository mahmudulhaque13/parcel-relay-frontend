import CreateShipmentForm from "@/components/form/create-shipment-form";

export default function CreateShipmentPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Shipment</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your shipment details step by step.
          </p>
        </div>

        <CreateShipmentForm />
      </div>
    </main>
  );
}
