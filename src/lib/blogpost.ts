import { Post } from "@/types/blog";

export const CATEGORIES = ["All", "Design", "Technology", "Product", "Culture", "Strategy"];

export const POSTS: Post[] = [
    {
        id: 1,
        slug: "the-future-of-digital-product-design",
        category: "Design",
        title: "The Future of Digital Product Design in the Age of AI",
        excerpt:
            "How artificial intelligence is reshaping the way we think about interfaces, workflows, and the human experience of software.",
        author: "Arjun Mehta",
        authorRole: "Creative Director",
        authorAvatar: "https://picsum.photos/seed/author1/64/64",
        date: "Aug 12, 2026",
        readTime: "8 min read",
        image: "https://picsum.photos/seed/design-ai/1200/700",
        featured: true,
        tags: ["AI", "UX", "Future"],
        content: `Artificial intelligence is no longer a distant horizon — it is the present surface we design on. In 2026, every interaction layer from micro-copy generation to adaptive layout logic is being touched by machine intelligence.

## What Changes First

The first casualty of AI in product design is the blank canvas. Designers no longer start from zero. They start from a well-reasoned first draft that understands brand voice, user history, and business constraints simultaneously. This shifts the designer's primary skill from origination to curation and critique.

The second shift is in the feedback loop. Historically, design validation lived in user research cycles that could stretch weeks. AI-assisted tools compress this into hours — synthetic user panels, heatmap prediction, and accessibility scoring happen in real time.

## The New Designer's Stack

Modern product designers at the frontier are fluent in prompt engineering, model evaluation, and ethical AI review. They understand latency budgets and know how to specify "feel" to an LLM in ways that produce consistent output.

The tools have changed but the core responsibility has not: designers still own the emotional quality of the experience. AI is extraordinarily capable at generating plausible — it struggles with genuinely moving.

## What This Means for Teams

Design teams that embrace AI as a creative collaborator rather than an automation threat are shipping more ambitious work with smaller headcounts. The leverage is real and the gap between AI-native and AI-adjacent studios is already visible in RFP competitions.

The studios winning the most interesting briefs in 2026 are the ones that can speak both languages — deep craft sensibility and machine-assisted scale.

## The Risk Worth Naming

Homogenisation. When all studios draw from the same model weights, the aesthetic floor rises but the ceiling may lower. The creative responsibility of the designer shifts from making the ordinary good to making the AI-generated good into something genuinely extraordinary and specific to this client, this moment, this brief.

That specificity — irreducibly human and contextual — remains the irreplaceable core of great digital product design.`,
    },
    {
        id: 2,
        slug: "building-design-systems-that-scale",
        category: "Design",
        title: "Building Design Systems That Actually Scale",
        excerpt:
            "Token-first architecture, component philosophy, and the team habits that separate a design system that thrives from one that gathers dust.",
        author: "Priya Sharma",
        authorRole: "Lead Designer",
        authorAvatar: "https://picsum.photos/seed/author2/64/64",
        date: "Aug 8, 2026",
        readTime: "6 min read",
        image: "https://picsum.photos/seed/design-sys/800/500",
        tags: ["Design System", "Tokens", "Scale"],
        content: `A design system is never finished. The teams that succeed with them understand this from day one — a system is a living product with users, backlog, and release cycles of its own.

## Start With Tokens, Not Components

The most common failure mode is building components before establishing a robust token layer. Tokens are the semantic contract between design and engineering. Get them wrong at the start and every component inherits the technical debt.

A mature token architecture has three layers: primitive (raw values), semantic (context-aware aliases), and component-specific overrides. Skipping to component-specific tokens without the semantic layer means every theming decision becomes a manual find-and-replace exercise.

## The Component Philosophy That Works

Atomic components should be dumb and flexible. Composition should happen at the pattern level. The biggest sign of a healthy system is that the design system team rarely needs to be consulted when product teams want something new — they can compose what they need from existing primitives.

## The Human Side

The best-architected system fails without adoption. Adoption comes from trust, and trust comes from the system being faster than rolling your own. If your system has a 2-week PR cycle for adding a new variant, product teams will fork.

Invest in developer experience: good documentation, Storybook stories with real examples, and a clear contribution guide. Make it easier to extend the system correctly than to bypass it.`,
    },
    {
        id: 3,
        slug: "micro-interactions-that-delight",
        category: "Design",
        title: "Micro-Interactions That Turn Users Into Fans",
        excerpt:
            "The tiny moments that make a product feel alive. We break down five interaction patterns we ship that consistently move the needle on user satisfaction.",
        author: "Ravi Krishnan",
        authorRole: "Motion Designer",
        authorAvatar: "https://picsum.photos/seed/author3/64/64",
        date: "Aug 3, 2026",
        readTime: "5 min read",
        image: "https://picsum.photos/seed/motion-ui/800/500",
        tags: ["Animation", "UX", "Micro"],
        content: `There is a threshold in interface design where the product stops feeling like software and starts feeling like a place. Micro-interactions are the primary mechanism that creates this effect.

## The Five Patterns We Ship

**1. Optimistic UI with graceful rollback.** Confirming an action immediately in the interface — before the server responds — with a polished rollback animation if something goes wrong. Users feel respected; errors feel recoverable.

**2. Physics-informed spring animations.** Replacing linear easing with spring physics makes motion feel grounded. The key parameter is not duration — it is stiffness and damping.

**3. Contextual cursor adaptation.** Expanding or morphing the cursor when it enters interactive zones gives spatial cues without requiring explicit affordances.

**4. Haptic vocabulary (mobile).** Defining a small vocabulary of haptic patterns — confirmation, warning, selection — and using them consistently creates a tactile language users internalise without noticing.

**5. Empty state illustrations that teach.** Empty states are the highest-leverage real estate in onboarding. A well-crafted empty state micro-animation teaches the user what to do next while making them smile.

## The Budget

Animation work is expensive and easy to over-invest in. We use a rule: if it takes longer to notice than to perform, it is too slow. Most micro-interactions should complete in 150–350ms.`,
    },
    {
        id: 4,
        slug: "webgl-performance-at-scale",
        category: "Technology",
        title: "WebGL at Scale: Lessons from Shipping 60fps Experiences",
        excerpt:
            "Real-world lessons from building GPU-heavy marketing sites — shader optimisation, render budget, and graceful degradation strategies.",
        author: "Dev Kapoor",
        authorRole: "Senior Engineer",
        authorAvatar: "https://picsum.photos/seed/author4/64/64",
        date: "Jul 28, 2026",
        readTime: "10 min read",
        image: "https://picsum.photos/seed/webgl-perf/800/500",
        tags: ["WebGL", "Performance", "3D"],
        content: `Shipping a GPU-driven marketing experience that runs at a consistent 60fps across mid-range devices is a different engineering problem than shipping the same experience in a controlled demo environment. Here is what we have learned.

## The Render Budget Is Sacred

Before a single line of shader code is written, define your render budget. For a 60fps target: 16.7ms per frame, of which GPU work should consume no more than 12ms to leave headroom for the browser's compositor and JavaScript.

## Shader Complexity Is the Primary Lever

The most impactful optimisation lever is shader complexity — specifically the number of texture samples and math operations per fragment. Profile with GPU timing queries, not CPU frame time. They can diverge significantly.

## Graceful Degradation Is Not Optional

Your WebGL experience will run on devices you did not test. Build a device capability scoring system on first load: check for WebGL2 support, max texture size, and GPU tier (derived from renderer string). Serve progressively simplified experiences based on the score.

## The Battery Problem

A beautiful 60fps experience that drains a phone battery in 20 minutes is a bad product decision. Implement frame rate throttling when the page is not in focus, and consider offering a "reduce motion" path that freezes or dramatically simplifies the GL scene.`,
    },
    {
        id: 5,
        slug: "product-led-growth-playbook",
        category: "Product",
        title: "The Product-Led Growth Playbook for Digital Studios",
        excerpt:
            "How creative studios can package their craft into repeatable products, build self-serve funnels, and escape the project treadmill.",
        author: "Sneha Patel",
        authorRole: "Head of Product",
        authorAvatar: "https://picsum.photos/seed/author5/64/64",
        date: "Jul 22, 2026",
        readTime: "7 min read",
        image: "https://picsum.photos/seed/plg-strategy/800/500",
        tags: ["PLG", "Growth", "Studio"],
        content: `Most digital studios are on a project treadmill: client ends, pipeline empties, scramble begins. Product-led growth offers an exit ramp — but it requires a genuinely different mindset.

## What PLG Means for a Studio

Product-led growth in a B2B SaaS context means the product itself drives acquisition, retention, and expansion. For a creative studio, the parallel is packaging what you do into something that sells itself without a sales call.

This does not mean every studio should launch a SaaS product. It means identifying which parts of your craft can be productised — templates, frameworks, audits, toolkits — and building self-serve distribution for them.

## The Flywheel

The studio PLG flywheel looks like this: craft a remarkable thing → give away a useful version of it → charge for the premium version → the free tier generates word-of-mouth → more craft opportunities arrive.

## The Traps

The biggest trap is pricing too low. Free tools from a studio feel like marketing; tools priced at $99/month signal craft worth paying for. The second trap is building for too broad an audience. The best studio products serve a very specific person with a very specific problem.

## Starting Point

Audit your last twelve months of project work. Find the problem you solved repeatedly. That is your first product.`,
    },
    {
        id: 6,
        slug: "creative-culture-remote-first",
        category: "Culture",
        title: "Keeping Creative Culture Alive in a Remote-First World",
        excerpt:
            "The rituals and async practices we have refined over three years of fully distributed creative work across six time zones.",
        author: "Ananya Roy",
        authorRole: "Culture Lead",
        authorAvatar: "https://picsum.photos/seed/author6/64/64",
        date: "Jul 15, 2026",
        readTime: "5 min read",
        image: "https://picsum.photos/seed/culture-remote/800/500",
        tags: ["Culture", "Remote", "Team"],
        content: `Three years of fully distributed work across six time zones has taught us that creative culture is not a by-product of physical co-location — it is a deliberate design problem.

## The Rituals That Work

**Weekly Show & Tell (async):** Every Friday, anyone can post a 2-minute Loom of something they made or found interesting that week. No agenda. No requirement to comment. Over time this creates a shared aesthetic vocabulary across the team without a single meeting.

**The Written Brief:** We write every project brief as a narrative document before any kickoff call. This forces clarity of thought and gives remote team members who are asynchronous equal access to the full creative context.

**Critique with Context:** Design critique works in async if and only if context is explicit. Our template: here is what I was trying to achieve, here is what I am uncertain about, here are the specific questions I want answered.

## What Does Not Work

Relying on organic hallway conversations for alignment. Assuming time-zone overlap exists for the things that matter. Using a single communication channel for both urgent and non-urgent information.

## The Measurement

We run a quarterly "creative energy" pulse: do you feel your best work is happening here? Trending this metric against workload, team size, and process changes has taught us more about culture health than any other signal.`,
    },
    {
        id: 7,
        slug: "ai-content-strategy-2026",
        category: "Strategy",
        title: "Content Strategy in the Age of Generative AI",
        excerpt:
            "How brands should think about originality, voice, and trust when AI-generated content floods every channel.",
        author: "Rohan Nair",
        authorRole: "Strategy Director",
        authorAvatar: "https://picsum.photos/seed/author7/64/64",
        date: "Jul 9, 2026",
        readTime: "9 min read",
        image: "https://picsum.photos/seed/ai-content/800/500",
        tags: ["AI", "Content", "Brand"],
        content: `When every brand can generate unlimited content at near-zero marginal cost, content volume ceases to be a competitive differentiator. What remains is voice, specificity, and trust.

## The Paradox of Abundance

The generative AI content explosion creates a paradox: more content is available than ever before, but attention to any single piece of content is declining faster than ever before. The winners in this environment are not the most prolific — they are the most specific.

## Voice Is the Moat

A brand voice that is genuinely distinctive — rooted in a specific worldview, expressed consistently, and occasionally willing to say something that not everyone will agree with — is the most durable content asset a company can build. It is also the hardest thing to replicate with an AI system trained on consensus text.

## The Trust Architecture

Audiences are developing rapid literacy for AI-generated content. The tells are subtle but accumulating. Brands that label AI-assisted content honestly and reserve human-written content for high-stakes moments are building trust capital. Brands that flood every channel with undifferentiated AI output are spending trust capital they may not be able to recover.

## The Strategic Frame

Think of your content portfolio in three tiers: AI-assisted (fast, scaled, topical), human-curated (AI-drafted, human-refined, brand-voice-checked), and signature (fully human, deeply specific, designed to be remembered). Most brands should be spending 80% of their creative energy on the third tier and letting AI handle the first.`,
    },
];