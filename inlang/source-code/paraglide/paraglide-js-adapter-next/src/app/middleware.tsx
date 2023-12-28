import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import {
	sourceLanguageTag,
	availableLanguageTags,
} from "$paraglide-adapter-next-internal/runtime.js"
import { LANGUAGE_HEADER } from "../constants"
import { prefixStrategy } from "./navigation/prefixStrategy"

const { getLocaleFromPath, translatePath } = prefixStrategy(
	availableLanguageTags,
	sourceLanguageTag
)

/**
 * Sets the request headers to resolve the language tag in RSC.
 * https://nextjs.org/docs/pages/building-your-application/routing/middleware#setting-headers
 */
export function paraglideMiddleware(request: NextRequest) {
	const locale = getLocaleFromPath(request.nextUrl.pathname) ?? sourceLanguageTag
	const headers = new Headers(request.headers)

	headers.set(LANGUAGE_HEADER, locale)

	//set Link header for alternate language versions
	const linkHeader = availableLanguageTags
		.map(
			(lang) =>
				`<${translatePath(request.nextUrl.pathname, lang)}>; rel="alternate"; hreflang="${locale}"`
		)
		.join(", ")

	headers.set("Link", linkHeader)

	return NextResponse.next({
		request: {
			headers,
		},
	})
}