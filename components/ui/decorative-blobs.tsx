export function DecorativeBlobs() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
    </div>
  );
}
