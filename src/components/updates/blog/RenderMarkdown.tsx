export function renderMarkdown(content: string) {
    return content.split("\n").map((line, i) => {
        if (line.startsWith("## ")) {
            return (
                <h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 tracking-tight">
                    {line.replace("## ", "")}
                </h2>
            );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
            return (
                <p key={i} className="font-semibold text-amber-300 mt-5 mb-1">
                    {line.replace(/\*\*/g, "")}
                </p>
            );
        }
        if (line.trim() === "") return <div key={i} className="h-2" />;
        return (
            <p key={i} className="text-white/65 leading-[1.85] text-sm sm:text-[15px]">
                {line}
            </p>
        );
    });
}