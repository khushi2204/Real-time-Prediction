import { cn } from "@/lib/utils";

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-black dark:bg-black">
      {/* Grid Background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_0.5px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_0.5px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      {/* Radial Gradient Overlay for Fade Effect */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black dark:bg-black"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 80%)",
          maskImage:
            "radial-gradient(circle, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 80%)",
          zIndex: 10,
        }}
      />

      {/* Text Content */}
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </div>
  );
}
