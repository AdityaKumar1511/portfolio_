import metaData from "@/data/meta.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";

export interface CommandResult {
  output: string | string[];
  action?: () => void;
}

export function executeCommand(
  cmdStr: string,
  onClear: () => void,
  onExit: () => void
): CommandResult {
  const parts = cmdStr.trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).map((a) => a.toLowerCase());

  if (!command) {
    return { output: "" };
  }

  switch (command) {
    case "whoami":
      return {
        output: `${metaData.name} — ${metaData.year} @ ${metaData.college}. ${metaData.role}.`,
      };
    case "ls":
      if (args[0] === "projects") {
        const names = projectsData.map((p: any) => p.slug);
        return {
          output: names.map((n) => `- ${n}`),
        };
      }
      return {
        output: ["projects/", "skills/", "achievements/", "contact/"],
      };
    case "cat": {
      const target = args[0];
      if (!target) {
        return {
          output: "Usage: cat <filename/directory> (e.g. cat skills, cat arbitrage)",
        };
      }
      if (target === "skills") {
        const skillsList = Object.entries(skillsData).map(
          ([category, items]) => `${category}: ${items.join(", ")}`
        );
        return {
          output: skillsList,
        };
      }
      const project = projectsData.find((p: any) => p.slug === target);
      if (project) {
        return {
          output: [
            `Project: ${project.name}`,
            `Description: ${project.description}`,
            `Tech Stack: ${project.tech.join(", ")}`,
            `Impact: ${project.impact}`,
            `GitHub: ${project.repoUrl}`,
            `Live Demo: ${project.liveUrl}`,
          ],
        };
      }
      return {
        output: `File not found: ${target}`,
      };
    }
    case "open": {
      const linkTarget = args[0];
      if (!linkTarget) {
        return {
          output: "Usage: open github OR open linkedin",
        };
      }
      if (linkTarget === "github") {
        return {
          output: "Opening GitHub...",
          action: () => window.open(metaData.github, "_blank"),
        };
      }
      if (linkTarget === "linkedin") {
        return {
          output: "Opening LinkedIn...",
          action: () => window.open(metaData.linkedin, "_blank"),
        };
      }
      return {
        output: `Unknown link: ${linkTarget}`,
      };
    }
    case "resume":
      return {
        output: "Downloading resume...",
        action: () => {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      };
    case "help":
      return {
        output: [
          "Available commands:",
          "  whoami         Reveal identity of developer",
          "  ls             List top-level directories",
          "  ls projects    List all project slugs",
          "  cat skills     Show skills by category",
          "  cat <project>  Show details of a project (e.g. cat arbitrage)",
          "  open github    Open GitHub profile in a new tab",
          "  open linkedin  Open LinkedIn profile in a new tab",
          "  resume         Download the PDF resume",
          "  clear          Clear the terminal screen",
          "  exit           Close the terminal",
          "",
          "Easter Eggs:",
          "  sudo rm -rf /  rm -rf *  git blame",
        ],
      };
    case "clear":
      return {
        output: "",
        action: onClear,
      };
    case "exit":
      return {
        output: "Exiting...",
        action: onExit,
      };
    // Easter eggs
    case "sudo":
      if (args[0] === "rm" && args[1] === "-rf" && args[2] === "/") {
        return {
          output: "Nice try. But this isn't your laptop.",
        };
      }
      return {
        output: "Permission denied.",
      };
    case "rm":
      if (args[0] === "-rf" && args[1] === "*") {
        return {
          output: "Haha, no. Go touch grass.",
        };
      }
      return {
        output: "Usage: rm <filename>",
      };
    case "git":
      if (args[0] === "blame") {
        return {
          output: `${metaData.name}  —  100% of commits`,
        };
      }
      return {
        output: "Usage: git blame",
      };
    default:
      return {
        output: `Command not found: ${command}. Type 'help' for a list of available commands.`,
      };
  }
}
