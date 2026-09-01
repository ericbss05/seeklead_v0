import ICPForm from "@/components/icp-form";
import { IcpChoicesDisplay } from "@/components/icp-form/icp-choices-display";
import { IcpProvider } from "@/components/icp-form/icp-context";

export default function DashboardPage() {
  return (
    <IcpProvider>
      <div className="flex h-screen flex-col bg-background">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center border-b px-6">
          <span className="text-lg font-semibold">
            Seeklead
          </span>
        </header>

        {/* Contenu */}
        <main className="flex min-h-0 flex-1">
          {/* 1/3 */}
          <section className="w-1/3 border-r overflow-y-auto">
            <div className="h-full p-6">
              <ICPForm />
            </div>
          </section>

          {/* 2/3 */}
          <section className="w-2/3 overflow-y-auto">
            <div className="h-full p-6">
              <IcpChoicesDisplay />
            </div>
          </section>
        </main>
      </div>
    </IcpProvider>
  );
}
