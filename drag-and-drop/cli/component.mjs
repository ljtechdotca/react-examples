import fs from "fs";
import path from "path";
import readline from "readline";

let cmd = process.argv[2];
let componentFolder, componentPath, indexPath, stylePath;
indexPath = path.resolve(".", "src", "components", "index.ts");
try {
  if (cmd.startsWith("remove")) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    cmd = process.argv[3];

    if (cmd.includes("/")) {
      cmd = cmd.split("/");
      indexPath = path.resolve(".", "src", "components", cmd[0], "index.ts");
      cmd = cmd.join("/");
    }

    componentFolder = path.resolve(".", "src", "components", cmd);
    if (!fs.existsSync(componentFolder)) {
      rl.close();
      throw new Error(`Invalid Component Folder: "${cmd}"`);
    }

    console.log("\x1b[33m%s\x1b[0m", `Do you wish to remove '${cmd}'?`);
    rl.question(`(y/n)\n`, (answer) => {
      switch (answer) {
        case "y":
          fs.rmSync(componentFolder, { recursive: true, force: true });
          if (cmd.includes("/")) {
            cmd = cmd.split("/");
            cmd = cmd[cmd.length - 1];
          }
          if (fs.existsSync(indexPath)) {
            fs.writeFileSync(
              indexPath,
              [
                ...Array.from(
                  new Set(fs.readFileSync(indexPath, "utf8").split("\n")).keys()
                ),
              ]
                .filter((item) => item !== `export * from "./${cmd}/${cmd}";`)
                .join("\n")
            );
          }
          rl.close();
          break;

        case "n":
          rl.close();
          break;

        default:
          console.log("Please enter 'y' or 'n'!");
          break;
      }
    });
  } else {
    if (cmd.includes("/")) {
      cmd = cmd.split("/");
      indexPath = path.resolve(".", "src", "components", cmd[0], "index.ts");
      console.log(indexPath);
      componentFolder = path.resolve(".", "src", "components", ...cmd);
      cmd = cmd[cmd.length - 1];
    } else {
      indexPath = path.resolve(".", "src", "components", "index.ts");
      componentFolder = path.resolve(".", "src", "components", cmd);
    }
    componentPath = path.resolve(componentFolder, `${cmd}.tsx`);
    stylePath = path.resolve(componentFolder, `${cmd}.module.scss`);

    // create the directories
    fs.mkdirSync(componentFolder, { recursive: true });

    // create the component
    fs.writeFileSync(
      componentPath,
      `import styles from "./${cmd}.module.scss";

  interface ${cmd}Props {}

  export const ${cmd} = ({}: ${cmd}Props) => {
    return (
    <div className={styles.root}>
      task: new component ${cmd}
    </div>
  );
}

export default ${cmd};`
    );

    // create style sheet
    fs.writeFileSync(
      stylePath,
      `.root {
  display: grid;
}`
    );

    // if index file does not exist create one
    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, ``);
    }

    // create index content
    fs.writeFileSync(
      indexPath,
      [
        ...Array.from(
          new Set(fs.readFileSync(indexPath, "utf8").split("\n")).keys()
        ),
        `export * from "./${cmd}/${cmd}";`,
      ]
        .sort((a, b) => a.localeCompare(b))
        .join("\n")
    );

    console.log("\x1b[32m%s\x1b[0m", `Component Created:'${cmd}'`);
  }
} catch (error) {
  console.error("\x1b[31m%s\x1b[0m", error.message);
}
