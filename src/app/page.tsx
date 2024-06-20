import FormGeneratorDialog from "@/components/FormGeneratorDialog";
import Header from "@/components/Header";
import Landing from "@/components/Landing";

export default function Home() {
  return (
  <main className="">
    <Header/>
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Landing/>
    </main>
  </main>
  );
}
