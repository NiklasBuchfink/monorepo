import { findRepoRoot, openRepository } from "@lix-js/client"
import { Command } from "commander"
import nodeFsPromises from "node:fs/promises"
import { Logger } from "@inlang/paraglide-js/internal"
import { Steps, cli as ParaglideCli } from "@inlang/paraglide-js/internal/cli"
import { scanNextJSProject } from "../flows/scan-next-project"
import { appRouterSetup } from "../flows/app-router-setup"
import { getOutDir } from "../flows/getOutDir"
import { pagesRouterSetup } from "../flows/pages-router-setup"

export const InitCommand = new Command()
	.name("init")
	.summary("Initializes Paraglide-JS in this NextJS Project")
	.action(async () => {
		const repoRoot = await findRepoRoot({ nodeishFs: nodeFsPromises, path: process.cwd() })

		// We are risking that there is no git repo. As long as we only use FS features and no Git features
		// from the SDK we should be fine.
		// Basic operations like `loadProject` should always work without a repo since it's used in CI.
		const repo = await openRepository(repoRoot ?? "file://" + process.cwd(), {
			nodeishFs: nodeFsPromises,
		})

		const logger = new Logger({ prefix: false, silent: false })
		const ctx0 = await Steps.checkForUncommittedChanges({
			repo,
			repoRoot: repoRoot?.replace("file://", "") ?? process.cwd(),
			logger,
			appId: MARKETPLACE_ID,
		})

		const ctx1 = await scanNextJSProject(ctx0)
		const ctx2 = await getOutDir(ctx1)
		const ctx4 = await Steps.initializeInlangProject(ctx2)
		const ctx5 = await Steps.updatePackageJson({
			dependencies: async (deps) => ({
				...deps,
				"@inlang/paraglide-next": PARAGLIDE_NEXT_VERSION,
			}),
			devDependencies: async (deps) => ({
				...deps,
				"@inlang/paraglide-js": ParaglideCli.version() as string,
			}),
		})(ctx4)
		const ctx6 = await Steps.maybeChangeTsConfig(ctx5)

		// addRouter Setup
		const ctx7 =
			ctx6.nextProject.router == "pages" ? await pagesRouterSetup(ctx6) : await appRouterSetup(ctx6)

		try {
			await Steps.runCompiler({ ...ctx7, outdir: ctx7.outdir.path })
		} catch (e) {
			//silently ignore
		}

		logger.success(`Successfully initialized Paraglide-JS in this NextJS Project.

Learn more about Paraglide and Paraglide-Next at:
https://inlang.com/m/osslbuzt/paraglide-next-i18n
`)
	})
