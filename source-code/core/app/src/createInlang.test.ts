/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, it, expect } from "vitest"
import { createInlang } from "./createInlang.js"
import { createMockNodeishFs } from "@inlang/plugin/test"
import type { InlangConfig } from "@inlang/config"
import type { Message, Plugin } from "@inlang/plugin"
import type { LintRule } from "@inlang/lint"
import type { ImportFunction, InlangModule } from "@inlang/module"
import { ConfigPathNotFoundError, ConfigSyntaxError, InvalidConfigError } from "./errors.js"

// ------------------------------------------------------------------------------------------------

const getValue = <T>(subscribable: { subscribe: (subscriber: (value: T) => void) => void }): T => {
	let value: T
	subscribable.subscribe((v) => void (value = v))
	return value!
}

const config: InlangConfig = {
	sourceLanguageTag: "en",
	languageTags: ["en"],
	modules: ["./dist/index.js"],
	settings: {
		"project.lintRuleLevels": {
			"inlang.lintRule.missingMessage": "error",
		},
		"inlang.plugin.i18next": {
			pathPattern: "./examples/example01/{languageTag}.json",
			variableReferencePattern: ["{", "}"],
		},
	},
}

const mockPlugin: Plugin = {
	meta: {
		id: "inlang.plugin.i18next",
		description: { en: "Mock plugin description" },
		displayName: { en: "Mock Plugin" },
		keywords: [],
	},
	loadMessages: () => exampleMessages,
	saveMessages: () => undefined as any,
	addAppSpecificApi: () => ({
		"inlang.app.ide-extension": {
			messageReferenceMatcher: (text: string) => text as any,
		},
	}),
}

// TODO: use `createMessage` utility
const exampleMessages: Message[] = [
	{
		id: "a",
		selectors: [],
		body: {
			en: [
				{
					match: {},
					pattern: [
						{
							type: "Text",
							value: "test",
						},
					],
				},
			],
		},
	},
	{
		id: "b",
		selectors: [],
		body: {
			en: [
				{
					match: {},
					pattern: [
						{
							type: "Text",
							value: "test",
						},
					],
				},
			],
		},
	},
]

const mockLintRule: LintRule = {
	type: "MessageLint",
	meta: {
		id: "namespace.lintRule.mock",
		description: { en: "Mock lint rule description" },
		displayName: { en: "Mock Lint Rule" },
	},
	message: () => undefined,
}

const _import: ImportFunction = async () =>
	({
		default: {
			plugins: [mockPlugin],
			lintRules: [mockLintRule],
		},
	} satisfies InlangModule)

// ------------------------------------------------------------------------------------------------

describe("initialization", () => {
	describe("config", () => {
		it("should throw if config file is not found", async () => {
			const fs = await createMockNodeishFs()

			expect(() =>
				createInlang({
					configPath: "./test.json",
					nodeishFs: fs,
					_import: _import,
				}),
			).rejects.toThrow(ConfigPathNotFoundError)
		})

		it("should throw if config file is not a valid JSON", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", "invalid json")

			expect(() =>
				createInlang({
					configPath: "./inlang.config.json",
					nodeishFs: fs,
					_import: _import,
				}),
			).rejects.toThrow(ConfigSyntaxError)
		})

		it("should throw if config file is does not match schema", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify({}))

			expect(() =>
				createInlang({
					configPath: "./inlang.config.json",
					nodeishFs: fs,
					_import: _import,
				}),
			).rejects.toThrow(InvalidConfigError)
		})

		it("should return the parsed config", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(getValue(inlang.config)).toStrictEqual(config)
		})
	})

	// describe("modules", () => {
	// 	it.todo("should throw if plugins contain errors", async () => {
	// 		const badPlugin: Plugin = {
	// 			...mockPlugin,
	// 		}
	// 		const $badImport: ImportFunction = async () =>
	// 			({
	// 				default: {
	// 					plugins: [badPlugin],
	// 					lintRules: [mockLintRule],
	// 				},
	// 			} satisfies InlangModule)

	// 		const fs = await createMockNodeishFs()
	// 		await fs.writeFile("./inlang.config.json", JSON.stringify(config))

	// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// 		const inlang = await createInlang({
	// 			configPath: "./inlang.config.json",
	// 			nodeishFs: fs,
	// 			_import: $badImport,
	// 		})

	// 		// inlang.errors.subscribe((errors) => {
	// 		// 	console.log(errors)
	// 		// })
	// 	})
	// 	it.todo("should throw if lintRules contain errors ???")
	// 	it.todo("should return meta data")
	// 	it.todo("should return plugins")
	// 	it.todo("should return lint rules")
	// })

	describe("flow", () => {
		it.todo("should not call functions multiple times")
		it.todo("should load modules after config")
		it.todo("should not load messages")
		it.todo("should not call lint")
	})

	describe("instance object", () => {
		it.todo("should contain all fields")
	})
})

describe("functionality", () => {
	describe("config", () => {
		it("should return the config", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(getValue(inlang.config)).toStrictEqual(config)
		})

		it("should set a new config", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(inlang.config()).toStrictEqual(config)

			inlang.setConfig({ ...config, languageTags: ["en", "de"] })
			expect(getValue(inlang.config)).toStrictEqual({ ...config, languageTags: ["en", "de"] })
			expect(inlang.config().languageTags).toStrictEqual(["en", "de"])

			inlang.setConfig({ ...config, languageTags: ["en", "de", "fr"] })
			expect(getValue(inlang.config)).toStrictEqual({ ...config, languageTags: ["en", "de", "fr"] })
			expect(inlang.config().languageTags).toStrictEqual(["en", "de", "fr"])
		})
	})

	describe("setConfig", () => {
		it("should fail if config is not valid", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			const result = inlang.setConfig({} as InlangConfig)
			expect(result.data).toBeUndefined()
			expect(result.error).toBeInstanceOf(InvalidConfigError)
		})

		it("should write config to disk", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			const before = await fs.readFile("./inlang.config.json", { encoding: "utf-8" })
			expect(before).toBeDefined()

			const result = inlang.setConfig({ ...config, languageTags: [] })
			expect(result.data).toBeUndefined()
			expect(result.error).toBeUndefined()

			// TODO: how to wait for fs.writeFile to finish?
			await new Promise((resolve) => setTimeout(resolve, 0))

			const after = await fs.readFile("./inlang.config.json", { encoding: "utf-8" })
			expect(after).toBeDefined()
			expect(after).not.toBe(before)
		})
	})

	describe("installed", () => {
		it("should return the installed items", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(inlang.installed.plugins()[0]).toStrictEqual({
				meta: mockPlugin.meta,
				module: config.modules[0],
			})

			expect(inlang.installed.lintRules()[0]).toEqual({
				meta: mockLintRule.meta,
				module: config.modules[0],
				lintLevel: "warning",
				disabled: false,
			})
		})

		it("should apply 'warning' as default lint level to lint rules that have no lint level defined in the config", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile(
				"./inlang.config.json",
				JSON.stringify({
					sourceLanguageTag: "en",
					languageTags: ["en"],
					modules: ["./dist/index.js"],
					settings: {
						"project.lintRuleLevels": {},
					},
				} satisfies InlangConfig),
			)
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(inlang.installed.lintRules()[0]?.lintLevel).toBe("warning")
		})

		it("should apply 'disabled' to lint rules if defined in the project settings", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile(
				"./inlang.config.json",
				JSON.stringify({
					sourceLanguageTag: "en",
					languageTags: ["en"],
					modules: ["./dist/index.js"],
					settings: {
						"project.disabled": [mockLintRule.meta.id],
					},
				} satisfies InlangConfig),
			)
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(inlang.installed.lintRules()[0]?.disabled).toBe(true)
		})

		it("should return lint reports for non-disabled lint rules ", async () => {
			const enabledLintRule: LintRule = {
				type: "MessageLint",
				meta: {
					id: "namespace.lintRule.enabled",
					description: { en: "Mock lint rule description" },
					displayName: { en: "Mock Lint Rule" },
				},
				message: ({ report }) => {
					report({
						messageId: "some-message-1",
						languageTag: "en",
						body: { en: "lintrule1" },
					})
				},
			}
			const disabledLintRule: LintRule = {
				type: "MessageLint",
				meta: {
					id: "namespace.lintRule.disabled",
					description: { en: "" },
					displayName: { en: "" },
				},
				message: ({ report }) => {
					report({
						messageId: "some-message-2",
						languageTag: "en",
						body: { en: "lintrule2" },
					})
				},
			}
			const _mockPlugin: Plugin = {
				meta: {
					id: "inlang.plugin.i18next",
					description: { en: "Mock plugin description" },
					displayName: { en: "Mock Plugin" },
					keywords: [],
				},
				loadMessages: () => [{ id: "some-message", selectors: [], body: {} }],
			}
			const fs = await createMockNodeishFs()
			await fs.writeFile(
				"./inlang.config.json",
				JSON.stringify({
					sourceLanguageTag: "en",
					languageTags: ["en"],
					modules: ["some-module.js"],
					settings: {
						"project.disabled": [disabledLintRule.meta.id],
					},
				} satisfies InlangConfig),
			)
			const _import = async () => {
				return {
					default: {
						plugins: [_mockPlugin],
						lintRules: [enabledLintRule, disabledLintRule],
					},
				} satisfies InlangModule
			}
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})
			await inlang.lint.init()
			expect(inlang.lint.reports()).toHaveLength(1)
			expect(inlang.lint.reports()[0]?.ruleId).toBe(enabledLintRule.meta.id)
			expect(
				inlang.installed.lintRules().find((rule) => rule.meta.id === disabledLintRule.meta.id)
					?.disabled,
			).toBe(true)
			expect(
				inlang.installed.lintRules().find((rule) => rule.meta.id === enabledLintRule.meta.id)
					?.disabled,
			).toBe(false)
		})

		// yep, this is a typical "hm, we have a bug here, let's write a test for it" test
		it("should return lint reports if disabled is not set", async () => {
			const _mockLintRule: LintRule = {
				type: "MessageLint",
				meta: {
					id: "namespace.lintRule.mock",
					description: { en: "Mock lint rule description" },
					displayName: { en: "Mock Lint Rule" },
				},
				message: ({ report }) => {
					report({
						messageId: "some-message-1",
						languageTag: "en",
						body: { en: "lintrule1" },
					})
				},
			}
			const _mockPlugin: Plugin = {
				meta: {
					id: "inlang.plugin.i18next",
					description: { en: "Mock plugin description" },
					displayName: { en: "Mock Plugin" },
					keywords: [],
				},
				loadMessages: () => [{ id: "some-message", selectors: [], body: {} }],
			}
			const fs = await createMockNodeishFs()
			await fs.writeFile(
				"./inlang.config.json",
				JSON.stringify({
					sourceLanguageTag: "en",
					languageTags: ["en"],
					modules: ["some-module.js"],
					settings: {},
				} satisfies InlangConfig),
			)
			const _import = async () => {
				return {
					default: {
						plugins: [_mockPlugin],
						lintRules: [_mockLintRule],
					},
				} satisfies InlangModule
			}
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})
			await inlang.lint.init()
			expect(inlang.lint.reports()).toHaveLength(1)
			expect(inlang.lint.reports()[0]?.ruleId).toBe(_mockLintRule.meta.id)
			expect(inlang.installed.lintRules()).toHaveLength(1)
			expect(inlang.installed.lintRules()[0]?.disabled).toBe(false)
		})
	})

	describe("errors", () => {
		it("should return the errors", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})
			inlang.errors.subscribe((errors) => {
				expect(errors).toStrictEqual([])
			})
		})
	})

	describe("appSpecificApi", () => {
		it("should return the app specific api", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			inlang.appSpecificApi.subscribe((api) => {
				expect(api["inlang.app.ide-extension"]).toBeDefined()
			})
		})
	})

	describe("messages", () => {
		it("should return the messages", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})

			expect(inlang.query.messages.getAll()).toEqual(exampleMessages)
		})
	})

	describe("lint", () => {
		it.todo("should throw if lint reports are not initialized yet", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})
			// TODO: test with real lint rules
			try {
				inlang.lint.reports.subscribe((r) => expect(r).toEqual([]))
				throw new Error("Should not reach this")
			} catch (e) {
				expect((e as Error).message).toBe("lint not initialized yet")
			}
		})
		it("should return the lint reports", async () => {
			const fs = await createMockNodeishFs()
			await fs.writeFile("./inlang.config.json", JSON.stringify(config))
			const inlang = await createInlang({
				configPath: "./inlang.config.json",
				nodeishFs: fs,
				_import: _import,
			})
			await inlang.lint.init()
			// TODO: test with real lint rules
			inlang.lint.reports.subscribe((r) => expect(r).toEqual([]))
		})
	})
})
