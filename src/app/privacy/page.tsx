export const metadata = {
  title: "Privacy Overview | ParcelRelay",
  description: "Privacy and data-handling overview for ParcelRelay.",
};
export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-widest text-[#C65338]">
        Legal
      </p>
      <h1 className="mt-2 text-4xl font-black">Privacy Overview</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: October 19, 2026
      </p>
      <div className="mt-8 space-y-6 leading-7 text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Information used by the service
          </h2>
          <p>
            ParcelRelay may process account details, shipment and recipient
            information, courier application data, and payment status needed to
            provide delivery workflows.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">Use and access</h2>
          <p>
            Use account features only for their intended purpose. Protected
            information should be available only to authorized roles and used to
            operate, support, and secure the service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">Security</h2>
          <p>
            Never send passwords, one-time passcodes, or payment secrets to
            support or AI assistant prompts. Do not include sensitive personal
            information in optional messages.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Contact and scope
          </h2>
          <p>
            This page is a product privacy overview, not a substitute for a
            legally reviewed privacy policy. The service operator should publish
            its verified contact details, retention periods, legal basis, and
            applicable data rights before production use.
          </p>
        </section>
      </div>
    </main>
  );
}
