export const metadata = {
  title: "Terms Overview | ParcelRelay",
  description: "Terms overview for using ParcelRelay delivery workflows.",
};
export default function TermsPage() {
  return (
    <main className="mx-auto min-h-[65vh] max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-bold uppercase tracking-widest text-[#C65338]">
        Legal
      </p>
      <h1 className="mt-2 text-4xl font-black">Terms Overview</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: October 19, 2026
      </p>
      <div className="mt-8 space-y-6 leading-7 text-muted-foreground">
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Account responsibility
          </h2>
          <p>
            Provide accurate account and shipment information, keep your login
            credentials private, and use only the dashboard features authorized
            for your role.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Shipment and payment workflows
          </h2>
          <p>
            Review shipment details, delivery quotes, and payment information
            before confirming a request. Status information reflects the records
            available in the service.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Courier and administrator access
          </h2>
          <p>
            Courier operations and administrative functions are restricted to
            approved accounts and assigned permissions. Do not attempt to access
            another person's records.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-foreground">
            Production readiness
          </h2>
          <p>
            This page is a product terms overview, not a legally reviewed
            agreement. The service operator should add verified business
            details, cancellation/refund terms, liability terms, governing law,
            and a support contact before public production use.
          </p>
        </section>
      </div>
    </main>
  );
}
