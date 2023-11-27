import { loadProject, type InlangProject } from "@inlang/sdk"
import consola from "consola"
import { compile } from "../../compiler/compile.js"
import fs from "node:fs/promises"
import { resolve } from "node:path"
import { Command } from "commander"
import { telemetry } from "../../services/telemetry/implementation.js"

export const compileCommand = new Command()
	.name("compile")
	.summary("Compiles inlang Paraglide-JS.")
	.requiredOption(
		"--project <path>",
		'The path to the inlang project. Example: "./project.inlang.json"'
	)
	.requiredOption(
		"--outdir <path>",
		'The path to the output directory. Example: "./src/paraglide"',
		"./src/paraglide"
	)
	.action(async (options: { project: string; outdir: string }) => {
		consola.info(`Compiling inlang project at "${options.project}".`)

		const settingsFilePath = resolve(process.cwd(), options.project)
		const project = exitIfErrors(
			await loadProject({
				settingsFilePath,
				nodeishFs: fs,
				_capture(id, props) {
					telemetry.capture({
						// @ts-ignore the event types
						event: id,
						properties: props,
					})
				},
			})
		)

		const output = compile({
			messages: project.query.messages.getAll(),
			settings: project.settings(),
		})

		const outputDirectory = resolve(process.cwd(), options.outdir)

		// create the compiled-output directory if it doesn't exist
		await fs.access(outputDirectory).catch(async () => {
			await fs.mkdir(outputDirectory, { recursive: true })
		})

		// create the messages directory if it doesn't exist
		await fs.access(outputDirectory + "/messages").catch(async () => {
			await fs.mkdir(outputDirectory + "/messages")
		})

		for (const [fileName, fileContent] of Object.entries(output)) {
			await fs.writeFile(`${outputDirectory}/${fileName}`, fileContent, {
				encoding: "utf-8",
			})
		}

		consola.success("Successfully compiled the project.")
	})

/**
 * Utility function to exit when the project has errors.
 */
const exitIfErrors = (project: InlangProject) => {
	if (project.errors().length > 0) {
		consola.warn(`The project has errors:`)
		for (const error of project.errors()) {
			consola.error(error)
		}
		process.exit(1)
	}
	return project
}
