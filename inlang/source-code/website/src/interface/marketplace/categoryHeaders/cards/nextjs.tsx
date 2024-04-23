import { showToast } from "#src/interface/components/Toast.jsx"
import Link from "#src/renderer/Link.jsx"
import { For, createSignal, onMount } from "solid-js"
import CheckIcon from "~icons/material-symbols/check"
import ContentCopyIcon from "~icons/material-symbols/content-copy-outline"
import copy from "clipboard-copy"

const NextjsHeader = () => {
	const [isInitialised, setIsInitialised] = createSignal(false)

	onMount(() => {
		if (!isInitialised()) {
			const grid = document.getElementById("nextjs-grid")

			const resizeObserver = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const newHeight = entry.contentRect.width
					if (grid) {
						if (entry.contentRect.width < 736) {
							grid.style.gridAutoRows = `${newHeight / 8}px`
						} else {
							grid.style.gridAutoRows = `${newHeight / 12}px`
						}
					}
				}
			})
			if (grid) {
				resizeObserver.observe(grid)
				setIsInitialised(true)
			}
		}
	})
	return (
		<>
			<div class="w-full h-full relative -mt-[33px] mb-20">
				<div id="nextjs-grid" class="relative z-20 grid w-full grid-cols-8 md:grid-cols-12">
					<div class="col-start-2 row-start-7 md:row-start-2 col-span-6 row-span-6 md:row-span-4">
						<NextBody />
					</div>
					<div class="row-start-2 md:row-start-2 col-start-1 md:col-start-8 col-span-8 md:col-span-4 row-span-4 md:row-span-4">
						<NextCard />
					</div>
					<div class="row-start-12 md:row-start-6" />
				</div>
				<div class="absolute w-full h-full top-0 left-0 flex justify-between">
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="bg-surface-200 w-[1px] h-full" />
					<div class="hidden md:block bg-surface-200 w-[1px] h-full" />
					<div class="hidden md:block bg-surface-200 w-[1px] h-full" />
					<div class="hidden md:block bg-surface-200 w-[1px] h-full" />
					<div class="hidden md:block bg-surface-200 w-[1px] h-full" />
				</div>
				<div class="absolute w-full h-full top-0 left-0 flex flex-col justify-between">
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
					<div class="block md:hidden bg-surface-200 w-full h-[1px]" />
				</div>
				<div class="absolute top-0 right-0 text-surface-400 translate-x-1/2 -translate-y-1/2">
					<Plus />
				</div>
				<div class="absolute bottom-0 left-0 text-surface-400 -translate-x-1/2 translate-y-1/2">
					<Plus />
				</div>
			</div>
		</>
	)
}

export default NextjsHeader

const NextCard = () => {
	return (
		<div class="relative w-full h-full">
			<div class="bg-background w-full h-full border border-surface-300 rounded-3xl overflow-hidden">
				<div class="relative h-1/3 md:h-1/2 bg-gradient-to-br from-surface-500 to-[#102C48] flex flex-col justify-center">
					<div class="hidden md:block px-12">
						<BgImage />
					</div>
					<div class="absolute w-full top-0 px-10 pt-4 flex items-center justify-between">
						<div class="flex gap-1 py-2">
							<div class="bg-[#ED8065] h-2 w-2 rounded-full" />
							<div class="bg-[#F7DE4A] h-2 w-2 rounded-full" />
							<div class="bg-surface-400 h-2 w-2 rounded-full" />
						</div>
						<p class="hidden sm:block text-surface-300 text-xs font-mono leading-7 tracking-wide">
							/index.tsx
						</p>
						<div class="invisible flex gap-1">
							<div class="bg-surface-200 h-2 w-2 rounded-full" />
							<div class="bg-surface-200 h-2 w-2 rounded-full" />
							<div class="bg-surface-200 h-2 w-2 rounded-full" />
						</div>
					</div>
				</div>
				<div class="h-2/3 md:h-1/2 flex flex-col items-center justify-center gap-2 sm:gap-5 pt-4 sm:pt-8">
					<h3 class="text-slate-900 text-2xl xl:text-3xl font-bold">paraglide-next</h3>
					<div
						onClick={(e) => {
							copy(e.currentTarget.textContent || "")
							showToast({
								title: "Copied to clipboard",
								variant: "success",
								message: "You have successfully copied the command to your clipboard",
							})
						}}
						class="text-slate-600 text-sm font-normal font-mono leading-snug bg-surface-200 w-fit px-4 py-2 rounded flex gap-2 cursor-pointer group"
					>
						<p>
							npx <span style={{ color: "#357fd3" }}>@inlang/paraglide-next</span> init
						</p>
						<ContentCopyIcon class="text-surface-400 group-hover:text-surface-700" />
					</div>
				</div>
			</div>
			<div class="absolute top-1/3 md:top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 border border-surface-300 bg-[#FFF] bg-opacity-80 backdrop-blur-[16px] rounded-full w-16 lg:w-20 xl:w-28">
				<img
					class="w-full p-3 lg:p-4"
					src="https://cdn.jsdelivr.net/gh/opral/monorepo@latest/inlang/source-code/paraglide/paraglide-js/assets/paraglideNoBg.png"
					alt="ParaglideJS"
				/>
			</div>
		</div>
	)
}

const NextBody = () => {
	const argumentsData = ["Fully typesafe", "Small Footprint", "SEO friendly"]

	return (
		<>
			<div class="bg-surface-50 border md:border-r-0 xl:border-t-0 border-surface-200 w-full h-full p-4 lg:p-12 xl:p-16 flex flex-col justify-between items-center md:items-start">
				<h2 class="text-surface-900 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-center md:text-start">
					Best performing i18n
					<br />
					library for Next.
				</h2>
				<div class="text-surface-600 flex flex-col lg:gap-2">
					<For each={argumentsData}>
						{(argument) => (
							<div class="flex items-center gap-2 md:text-sm lg:text-lg">
								<CheckIcon class="text-surface-700" />
								<p>{argument}</p>
							</div>
						)}
					</For>
				</div>
				<div class="flex flex-wrap gap-2 justify-center md:justify-start">
					<Link href="/m/osslbuzt/paraglide-next-i18n/">
						<div class="bg-surface-800 hover:bg-surface-900 text-background w-fit h-10 px-6 rounded-full cursor-pointer text-sm ld:text-md flex items-center">
							Documentation
						</div>
					</Link>
					<Link href="/g/wxcebbig/guide-lorissigrist-useParaglideJsWithNextjsAppRouter">
						<div class="bg-background text-surface-700 border border-surface-300 w-fit h-10 px-6 rounded-full cursor-pointer text-sm ld:text-md flex items-center">
							Quickstart Guide
						</div>
					</Link>
				</div>
			</div>
		</>
	)
}

function BgImage() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="auto"
			fill="none"
			viewBox="0 0 321 85"
		>
			<path
				fill="#fff"
				d="M55.134 19.405l-7.545-3.372v-1.3l7.545-3.362v1.744l-5.445 2.135-.471.151.471.16 5.445 2.1v1.744zm23.17-.01v-1.707l5.755-2.171.534-.151-.534-.17-5.756-2.135v-1.699l7.856 3.363v1.299l-7.856 3.372zm10.934 20.127l.044.908a2.18 2.18 0 01.766-.792c.32-.19.705-.288 1.156-.294.255 0 .484.03.685.09.208.053.389.133.543.24.113.082.213.183.302.302.095.118.175.252.24.4a2.264 2.264 0 01.659-.694c.166-.1.35-.18.552-.24a2.69 2.69 0 01.676-.098c.332 0 .631.05.898.151.267.095.493.238.677.428.201.213.355.492.462.836.107.338.16.738.16 1.2v7.19h-1.566v-7.207c0-.202-.023-.38-.07-.534a1.025 1.025 0 00-.205-.382.893.893 0 00-.356-.214 1.462 1.462 0 00-.48-.071c-.196 0-.365.027-.508.08-.142.053-.26.125-.356.214-.094.095-.169.204-.222.329a1.37 1.37 0 00-.107.4v7.384h-1.566v-7.215c0-.202-.023-.38-.07-.534a.88.88 0 00-.206-.382.753.753 0 00-.338-.205 1.353 1.353 0 00-.462-.071c-.196 0-.368.024-.516.071a1.011 1.011 0 00-.57.41 1.401 1.401 0 00-.133.266v7.66h-1.566v-9.626h1.477zm12.323 8.559c0-.35.107-.65.32-.899.214-.249.537-.373.97-.373.427 0 .75.124.97.373.225.243.338.543.338.899 0 .35-.113.643-.338.88-.226.238-.549.357-.97.357-.427 0-.751-.12-.97-.356a1.291 1.291 0 01-.32-.881zm8.995-7.127c.131-.195.276-.373.436-.533a3.45 3.45 0 01.507-.436c.285-.208.596-.365.934-.472a4.002 4.002 0 012.465.053c.415.143.768.368 1.058.677.291.308.513.7.668 1.174.16.469.24 1.026.24 1.673v6.058h-1.646v-6.076c0-.38-.044-.712-.133-.997-.089-.29-.22-.53-.392-.72a1.665 1.665 0 00-.694-.463 2.558 2.558 0 00-.961-.151c-.296 0-.578.041-.845.124a2.735 2.735 0 00-.738.356 3.037 3.037 0 00-.899.935v6.992h-1.646V35.483h1.646v5.472zm12.821 8.372a4.916 4.916 0 01-1.868-.347 4.231 4.231 0 01-1.45-.97 4.42 4.42 0 01-.943-1.476 4.995 4.995 0 01-.339-1.86V44.3c0-.777.125-1.471.374-2.082a4.773 4.773 0 01.997-1.566 4.318 4.318 0 011.396-.97 4.09 4.09 0 011.62-.338c.693 0 1.298.122 1.814.365a3.54 3.54 0 011.299.987c.344.428.599.929.766 1.504.172.575.258 1.198.258 1.868v.739h-6.878v.062c.042.469.134.88.276 1.237.148.356.35.67.605.943.261.29.575.519.943.685.368.166.774.249 1.219.249.587 0 1.109-.119 1.566-.356a3.4 3.4 0 001.139-.943l1.005.783c-.32.486-.801.92-1.441 1.299-.635.373-1.421.56-2.358.56zm-.213-8.63c-.333 0-.647.063-.944.187a2.436 2.436 0 00-.8.525 3.17 3.17 0 00-.605.872c-.16.338-.273.73-.338 1.175h5.178v-.08c0-.297-.057-.614-.169-.953a2.767 2.767 0 00-.472-.89 2.287 2.287 0 00-.765-.604c-.303-.154-.664-.231-1.085-.231zm12.5 8.452a1.938 1.938 0 01-.16-.462 6.024 6.024 0 01-.08-.587 4.46 4.46 0 01-1.228.863 4.275 4.275 0 01-.792.266 3.883 3.883 0 01-.889.098c-.51 0-.973-.074-1.388-.222a3.152 3.152 0 01-1.041-.605 2.604 2.604 0 01-.676-.89 2.774 2.774 0 01-.232-1.13c0-.527.104-.99.312-1.387.213-.398.513-.73.898-.997a4.236 4.236 0 011.388-.587 7.857 7.857 0 011.824-.196h1.797v-.756c0-.29-.053-.552-.16-.783a1.717 1.717 0 00-.454-.596 2.112 2.112 0 00-.72-.374 3.095 3.095 0 00-.943-.133 2.9 2.9 0 00-.881.124 2.14 2.14 0 00-.649.33c-.178.136-.318.3-.419.489a1.243 1.243 0 00-.142.578h-1.655c.006-.35.095-.694.267-1.032.178-.338.433-.643.765-.916a3.948 3.948 0 011.192-.65 4.863 4.863 0 011.611-.249 5.42 5.42 0 011.521.205c.469.13.875.329 1.219.596.338.273.605.61.801 1.014.195.404.293.875.293 1.415v4.475c0 .32.03.661.089 1.023.06.356.143.667.249.934v.142h-1.717zm-2.909-1.254c.32 0 .62-.041.899-.125a3.45 3.45 0 00.765-.329c.225-.136.421-.29.587-.462a2.36 2.36 0 00.391-.552v-1.948h-1.53c-.569 0-1.068.05-1.495.15-.421.096-.756.244-1.005.446a1.46 1.46 0 00-.409.507 1.596 1.596 0 00-.134.667c0 .237.039.457.116.659.083.201.205.373.365.516.16.148.362.263.605.346.243.084.525.125.845.125zm6.486-3.639c0-.718.089-1.376.267-1.975a4.746 4.746 0 01.783-1.557 3.554 3.554 0 011.21-1.014 3.444 3.444 0 011.593-.365c.575 0 1.076.098 1.503.294.433.19.807.468 1.121.836v-4.991h1.646v13.665h-1.512l-.071-1.014a3.154 3.154 0 01-1.148.89c-.445.201-.964.302-1.557.302a3.358 3.358 0 01-1.584-.373 3.637 3.637 0 01-1.201-1.032 4.992 4.992 0 01-.774-1.548 6.542 6.542 0 01-.276-1.931v-.187zm1.646.187c0 .469.051.913.152 1.335.1.42.258.791.471 1.112.208.32.475.575.801.765.326.184.718.276 1.174.276.552 0 1.009-.125 1.37-.374.362-.25.65-.584.863-1.005v-4.467a2.739 2.739 0 00-.863-.96c-.361-.256-.812-.383-1.352-.383-.463 0-.86.095-1.192.285-.326.19-.593.444-.801.765a3.515 3.515 0 00-.471 1.13 5.705 5.705 0 00-.152 1.334v.187zm9.138-8.959h4.92v12.242h3.141v1.423h-8.061v-1.423h3.274v-10.81h-3.274v-1.432zm10.214 4.04h4.92v8.202h3.141v1.423h-8.061v-1.423h3.274v-6.77h-3.274v-1.433zm3.061-2.528c0-.142.02-.275.062-.4a.84.84 0 01.507-.498c.125-.048.264-.071.418-.071.154 0 .291.023.41.07.118.042.216.102.293.179a.775.775 0 01.214.311c.047.125.071.261.071.41a.94.94 0 01-.249.667c-.166.178-.413.267-.739.267-.332 0-.581-.09-.747-.267a.96.96 0 01-.24-.668zm6.895 12.153v-9.626h1.477l.116 1.424c.142-.202.297-.386.463-.552a3.48 3.48 0 011.468-.88 3.723 3.723 0 011.067-.17c.504 0 .961.071 1.37.214.415.142.768.364 1.059.667.291.303.513.688.667 1.157.16.462.24 1.014.24 1.654v6.112h-1.645v-6.076c0-.427-.048-.789-.143-1.086a1.754 1.754 0 00-.418-.72 1.685 1.685 0 00-.694-.4 3.119 3.119 0 00-.925-.125c-.303 0-.584.044-.845.133a2.787 2.787 0 00-.721.347c-.178.13-.344.282-.498.454a3.262 3.262 0 00-.392.57v6.903h-1.646zm14.467.178a4.916 4.916 0 01-1.868-.347 4.24 4.24 0 01-1.45-.97 4.435 4.435 0 01-.943-1.476 4.995 4.995 0 01-.338-1.86V44.3c0-.777.124-1.471.373-2.082a4.789 4.789 0 01.997-1.566 4.322 4.322 0 011.397-.97 4.081 4.081 0 011.619-.338c.694 0 1.299.122 1.815.365a3.54 3.54 0 011.299.987c.344.428.599.929.765 1.504.172.575.258 1.198.258 1.868v.739h-6.877v.062c.041.469.133.88.275 1.237.149.356.35.67.605.943.261.29.576.519.943.685.368.166.774.249 1.219.249.587 0 1.109-.119 1.566-.356a3.4 3.4 0 001.139-.943l1.005.783c-.32.486-.8.92-1.441 1.299-.635.373-1.421.56-2.358.56zm-.213-8.63a2.41 2.41 0 00-.943.187 2.43 2.43 0 00-.801.525 3.17 3.17 0 00-.605.872c-.16.338-.273.73-.338 1.175h5.178v-.08c0-.297-.056-.614-.169-.953a2.767 2.767 0 00-.472-.89 2.268 2.268 0 00-.765-.604c-.302-.154-.664-.231-1.085-.231zm7.803 3.194c0-.848.065-1.645.196-2.393.136-.747.317-1.441.542-2.082.226-.634.484-1.215.774-1.743.297-.528.608-.997.935-1.406.32-.41.643-.76.969-1.05a5.41 5.41 0 01.935-.685l.346 1.085a5.056 5.056 0 00-.578.517c-.19.201-.376.426-.56.676-.273.385-.534.839-.783 1.36a9.709 9.709 0 00-.623 1.7c-.16.558-.285 1.172-.374 1.842a16.46 16.46 0 00-.133 2.162v.124c0 .742.041 1.436.124 2.082.083.646.196 1.243.339 1.788a12.206 12.206 0 001.165 2.803c.225.356.457.67.694.943.243.279.486.516.729.712l-.346 1.005a5.685 5.685 0 01-.944-.685 7.328 7.328 0 01-.969-1.05 10.391 10.391 0 01-1.7-3.15 13.359 13.359 0 01-.542-2.072 13.862 13.862 0 01-.196-2.394v-.089zm14.591.09c0 .848-.068 1.645-.204 2.393a12.829 12.829 0 01-.534 2.073 10.67 10.67 0 01-.783 1.743c-.291.528-.596.997-.916 1.406a7.449 7.449 0 01-.988 1.05c-.326.29-.637.519-.934.685l-.347-1.005c.249-.184.501-.422.756-.712a7.26 7.26 0 00.73-1.005 11.7 11.7 0 00.631-1.308c.208-.48.377-1.009.508-1.584.136-.534.24-1.11.311-1.726.077-.623.116-1.287.116-1.993v-.124c0-.801-.051-1.528-.152-2.18a15.708 15.708 0 00-.32-1.664 10.246 10.246 0 00-.623-1.752 10.53 10.53 0 00-.747-1.362 5.869 5.869 0 00-.605-.791 5.528 5.528 0 00-.605-.588l.347-1.005c.297.166.611.395.943.685.332.29.658.64.979 1.05.332.421.643.89.934 1.406a10.3 10.3 0 01.765 1.743c.213.623.388 1.3.525 2.029.142.723.213 1.539.213 2.446v.09z"
			/>
			<path
				fill="#ECC258"
				d="M59.485 12.954c.13-.195.276-.373.436-.533.16-.166.33-.312.507-.436.285-.208.596-.365.934-.472a4 4 0 012.464.053 2.58 2.58 0 011.06.677c.29.308.512.7.667 1.174.16.469.24 1.026.24 1.673v6.058h-1.646v-6.076c0-.38-.044-.712-.134-.996a1.87 1.87 0 00-.39-.721 1.666 1.666 0 00-.695-.463 2.557 2.557 0 00-.96-.151 2.83 2.83 0 00-.846.125 2.745 2.745 0 00-.738.355 3.003 3.003 0 00-.499.419 3.147 3.147 0 00-.4.516v6.992H57.84V7.483h1.646v5.471zm13.906 8.194h-1.645V10.294l-3.39 1.29v-1.503l4.902-1.886h.133v12.953z"
			/>
			<path
				fill="#94A3B8"
				d="M95.635 24.405c-.576-.018-1.074-.152-1.495-.4a3.274 3.274 0 01-1.05-.988 4.453 4.453 0 01-.605-1.317 5.224 5.224 0 01-.204-1.432v-1.504c0-.854-.205-1.474-.614-1.86-.404-.385-1.023-.58-1.86-.587v-1.29c.837 0 1.456-.19 1.86-.569.41-.386.614-1.008.614-1.868v-1.513c0-.48.062-.97.186-1.468.131-.504.336-.955.614-1.352.261-.38.602-.688 1.023-.925.422-.243.932-.374 1.53-.392l.188 1.023c-.427.012-.769.113-1.023.303-.25.19-.437.43-.561.72-.13.297-.213.63-.25.997-.035.368-.052.732-.052 1.094v1.513c0 .712-.167 1.337-.499 1.877-.326.534-.833.94-1.521 1.219.688.273 1.195.679 1.521 1.219.326.534.493 1.153.499 1.86v1.503c0 .367.03.732.088 1.094.06.368.164.697.312.988.142.296.332.54.57.729.242.19.548.29.916.302l-.187 1.024z"
			/>
			<rect width="103.665" height="26.11" x="217.077" y="29.148" fill="#1C2741" rx="4.555" />
			<path
				fill="url(#paint0_linear_4141_9873)"
				d="M232.068 40.733a3.588 3.588 0 00-.431-.896 2.753 2.753 0 00-.629-.683 2.635 2.635 0 00-.821-.43 3.278 3.278 0 00-1.01-.15 3.01 3.01 0 00-1.639.466c-.492.31-.883.767-1.173 1.371-.29.604-.436 1.345-.436 2.223 0 .878.147 1.619.441 2.223.294.604.691 1.06 1.193 1.37.502.311 1.066.466 1.693.466.581 0 1.092-.123 1.535-.371.445-.25.792-.604 1.039-1.06.251-.458.376-.998.376-1.618l.377.08h-3.05v-1.09h3.861v1.09c0 .834-.178 1.56-.534 2.177a3.692 3.692 0 01-1.466 1.436c-.62.336-1.333.505-2.138.505-.898 0-1.686-.212-2.366-.634-.677-.422-1.205-1.023-1.584-1.802-.377-.779-.565-1.703-.565-2.772 0-.802.108-1.523.322-2.163a4.795 4.795 0 01.921-1.644 4.018 4.018 0 011.406-1.04 4.345 4.345 0 011.787-.36c.534 0 1.033.08 1.495.242.465.158.879.384 1.242.678.367.29.672.639.916 1.045.244.402.413.85.505 1.341h-1.267zm7.853 7.129c-.733 0-1.365-.162-1.896-.486a3.256 3.256 0 01-1.223-1.366c-.284-.587-.426-1.27-.426-2.05 0-.778.142-1.465.426-2.059.287-.597.686-1.062 1.198-1.396.515-.336 1.115-.505 1.802-.505.396 0 .787.066 1.173.199a2.9 2.9 0 011.054.643c.317.294.57.683.758 1.168.188.485.282 1.083.282 1.792v.495h-5.861v-1.01h4.673a2.5 2.5 0 00-.257-1.148 1.949 1.949 0 00-.723-.797c-.31-.195-.677-.292-1.099-.292-.466 0-.868.115-1.208.347a2.272 2.272 0 00-.777.89c-.182.367-.273.76-.273 1.179v.673c0 .574.099 1.06.297 1.46.202.396.481.698.837.906.357.205.771.307 1.243.307.307 0 .584-.043.831-.129.251-.089.467-.22.649-.396.181-.178.322-.399.421-.663l1.128.317a2.5 2.5 0 01-.599 1.01c-.28.287-.627.511-1.039.673a3.86 3.86 0 01-1.391.237zm9.626-7.763v.99h-3.94v-.99h3.94zm-2.792-1.821h1.168v7.247c0 .33.048.578.144.742.099.162.224.271.376.327.155.053.318.08.49.08.129 0 .234-.007.317-.02l.198-.04.238 1.05c-.08.03-.19.059-.332.089-.142.033-.322.05-.54.05-.33 0-.653-.072-.97-.214a1.931 1.931 0 01-.782-.648c-.205-.29-.307-.657-.307-1.1v-7.563zm16.644 3.524l-1.05.297a1.94 1.94 0 00-.292-.51 1.413 1.413 0 00-.515-.415c-.217-.11-.496-.164-.836-.164-.465 0-.853.108-1.163.322-.307.211-.461.48-.461.807 0 .29.106.52.317.688.211.168.541.309.99.42l1.129.278c.68.165 1.186.418 1.519.758.334.336.5.77.5 1.301 0 .436-.125.825-.376 1.169-.247.343-.594.614-1.039.812-.446.198-.964.297-1.555.297-.775 0-1.417-.169-1.925-.505-.509-.337-.83-.829-.966-1.476l1.109-.277c.106.41.305.716.599.921.297.205.685.307 1.163.307.545 0 .977-.116 1.297-.347.324-.234.486-.514.486-.841a.884.884 0 00-.278-.663c-.184-.182-.468-.317-.851-.407l-1.267-.296c-.697-.166-1.208-.421-1.535-.768-.323-.35-.485-.787-.485-1.312 0-.429.12-.808.361-1.138a2.46 2.46 0 01.995-.777 3.497 3.497 0 011.436-.282c.752 0 1.343.165 1.772.495.432.33.739.765.921 1.306zm6.598-1.703v.99h-3.941v-.99h3.941zm-2.792-1.821h1.168v7.247c0 .33.048.578.144.742.099.162.224.271.376.327.155.053.318.08.49.08.129 0 .234-.007.317-.02l.198-.04.237 1.05c-.079.03-.189.059-.331.089-.142.033-.322.05-.54.05-.33 0-.653-.072-.97-.214a1.924 1.924 0 01-.782-.648c-.205-.29-.307-.657-.307-1.1v-7.563zm8.181 9.603c-.482 0-.919-.09-1.312-.272a2.25 2.25 0 01-.936-.797c-.231-.35-.346-.772-.346-1.267 0-.436.086-.789.257-1.06a1.82 1.82 0 01.688-.643c.287-.155.604-.27.951-.347.35-.079.701-.142 1.054-.188.462-.06.837-.104 1.124-.133.29-.033.501-.088.633-.164.136-.076.203-.208.203-.396v-.04c0-.488-.133-.867-.401-1.138-.264-.27-.665-.406-1.202-.406-.558 0-.995.122-1.312.367-.317.244-.54.504-.669.782l-1.108-.396c.198-.462.462-.822.792-1.08.333-.26.696-.442 1.089-.544a4.519 4.519 0 011.168-.158c.244 0 .525.03.841.089.321.056.629.173.926.351.301.178.55.447.748.807.198.36.297.842.297 1.445v5.01h-1.169v-1.03h-.059a2.047 2.047 0 01-.396.53 2.287 2.287 0 01-.738.48c-.307.132-.681.198-1.123.198zm.178-1.05c.462 0 .851-.09 1.168-.271.32-.182.561-.416.723-.703a1.79 1.79 0 00.247-.906v-1.07c-.049.06-.158.114-.326.164a5.519 5.519 0 01-.575.124 26.14 26.14 0 01-1.118.148c-.304.04-.588.104-.852.193-.26.086-.472.216-.633.391-.159.172-.238.406-.238.703 0 .406.15.713.45.921.304.205.689.307 1.154.307zm6.833.872V40.1h1.129v1.149h.079c.139-.376.389-.681.752-.916a2.216 2.216 0 011.228-.351c.086 0 .193.001.322.005.128.003.226.008.292.015v1.188a3.562 3.562 0 00-.272-.045 2.69 2.69 0 00-.441-.035c-.37 0-.7.078-.99.233a1.708 1.708 0 00-.931 1.55v4.811h-1.168zm10.364-7.604v.99h-3.94v-.99h3.94zm-2.792-1.821h1.168v7.247c0 .33.048.578.144.742.099.162.224.271.376.327.155.053.318.08.49.08.129 0 .234-.007.317-.02l.198-.04.238 1.05c-.08.03-.19.059-.332.089-.142.033-.322.05-.54.05-.33 0-.653-.072-.97-.214a1.931 1.931 0 01-.782-.648c-.205-.29-.307-.657-.307-1.1v-7.563zm9.05 9.584c-.733 0-1.365-.162-1.896-.486a3.256 3.256 0 01-1.223-1.366c-.284-.587-.426-1.27-.426-2.05 0-.778.142-1.465.426-2.059.287-.597.686-1.062 1.198-1.396.515-.336 1.115-.505 1.802-.505.396 0 .787.066 1.173.199a2.9 2.9 0 011.054.643c.317.294.57.683.758 1.168.188.485.282 1.083.282 1.792v.495h-5.861v-1.01h4.673c0-.429-.086-.811-.258-1.148a1.94 1.94 0 00-.722-.797c-.31-.195-.677-.292-1.099-.292-.466 0-.868.115-1.208.347a2.272 2.272 0 00-.777.89c-.182.367-.273.76-.273 1.179v.673c0 .574.099 1.06.297 1.46.202.396.481.698.837.906.356.205.771.307 1.243.307.307 0 .584-.043.831-.129.251-.089.467-.22.649-.396.181-.178.322-.399.421-.663l1.128.317a2.5 2.5 0 01-.599 1.01c-.28.287-.627.511-1.039.673a3.86 3.86 0 01-1.391.237zm9.19 0c-.633 0-1.193-.16-1.678-.48-.485-.324-.865-.78-1.138-1.367-.274-.59-.411-1.289-.411-2.094 0-.798.137-1.492.411-2.079.273-.587.655-1.041 1.143-1.361.489-.32 1.053-.48 1.693-.48.495 0 .886.082 1.173.247.291.162.512.346.664.554.155.205.275.373.361.505h.099v-3.742h1.168v10.138h-1.128v-1.168h-.139a7.682 7.682 0 01-.366.525 2.189 2.189 0 01-.678.559c-.294.162-.685.242-1.174.242zm.159-1.05c.468 0 .864-.122 1.188-.366.323-.248.569-.59.737-1.025.169-.439.253-.946.253-1.52 0-.567-.083-1.064-.248-1.49-.165-.429-.409-.762-.732-1-.324-.24-.723-.361-1.198-.361-.495 0-.908.127-1.238.381-.327.25-.572.593-.737 1.025-.162.429-.243.91-.243 1.445 0 .541.082 1.033.247 1.475.169.44.416.79.743 1.05.33.257.739.386 1.228.386z"
			/>
			<path
				fill="#94A3B8"
				d="M48.95 79.382c.362-.012.665-.113.908-.303a2.1 2.1 0 00.587-.73 3.5 3.5 0 00.303-.987c.065-.362.098-.727.098-1.094v-1.504c0-.468.068-.901.204-1.299.143-.397.359-.741.65-1.032.154-.154.326-.293.516-.418.195-.125.409-.234.64-.33a3.817 3.817 0 01-.658-.337 2.864 2.864 0 01-.516-.436 2.806 2.806 0 01-.632-1.032 3.949 3.949 0 01-.204-1.29v-1.513c0-.361-.021-.726-.063-1.094a3.413 3.413 0 00-.24-.996c-.13-.291-.32-.531-.57-.721-.248-.19-.587-.29-1.014-.303l.178-1.023c.576.018 1.068.14 1.477.365.415.225.757.519 1.023.88.303.41.52.87.65 1.38.136.51.205 1.014.205 1.512v1.513c0 .356.032.67.097.943.072.267.175.498.312.694.195.278.465.483.81.614.35.124.767.187 1.254.187v1.29c-.427.005-.8.059-1.121.16a1.766 1.766 0 00-.774.453 1.867 1.867 0 00-.436.757 3.614 3.614 0 00-.142 1.076v1.504c0 .474-.066.952-.196 1.432-.13.486-.332.928-.605 1.326a3.45 3.45 0 01-1.05.978c-.421.255-.922.389-1.504.4l-.186-1.022z"
			/>
			<path
				fill="#fff"
				d="M65.348 75.405l-7.544-3.372v-1.3l7.544-3.362v1.744l-5.445 2.135-.471.151.471.16 5.445 2.1v1.744zm4.876 2.855h-1.477l5.41-14.065h1.468l-5.4 14.066zm28.508-2.864v-1.708l5.756-2.171.534-.151-.534-.17-5.756-2.135v-1.699l7.855 3.363v1.299l-7.855 3.372z"
			/>
			<path
				fill="#ECC258"
				d="M79.913 68.954c.131-.195.276-.373.436-.533.16-.166.33-.312.507-.436.285-.208.597-.365.935-.472a4 4 0 012.464.053 2.58 2.58 0 011.059.677c.29.308.513.7.667 1.174.16.469.24 1.026.24 1.673v6.058h-1.646v-6.076c0-.38-.044-.712-.133-.996a1.87 1.87 0 00-.391-.721 1.666 1.666 0 00-.695-.463 2.557 2.557 0 00-.96-.151 2.83 2.83 0 00-.846.124 2.745 2.745 0 00-.738.356 3.003 3.003 0 00-.498.419 3.147 3.147 0 00-.4.516v6.992h-1.646V63.483h1.645v5.471zm13.907 8.194h-1.646V66.294l-3.39 1.29v-1.503l4.902-1.886h.134v12.953z"
			/>
			<path
				fill="#fff"
				d="M9.68 16.044c0 .825-.095 1.557-.285 2.198-.19.635-.463 1.168-.819 1.601a3.427 3.427 0 01-1.307.997c-.516.225-1.107.338-1.77.338-.66 0-1.25-.11-1.771-.33a3.447 3.447 0 01-1.326-1.005c-.362-.433-.637-.966-.827-1.601-.19-.64-.285-1.373-.285-2.198v-3.033c0-.825.095-1.554.285-2.189.19-.64.465-1.18.827-1.62a3.426 3.426 0 011.308-.996c.522-.23 1.112-.347 1.77-.347.665 0 1.255.116 1.77.347.523.226.965.558 1.326.997.356.439.63.979.819 1.62.19.634.285 1.363.285 2.188v3.034zm-6.735-.329l5.044-3.87a4.593 4.593 0 00-.258-1.13 2.321 2.321 0 00-.489-.827 1.883 1.883 0 00-.747-.507 2.796 2.796 0 00-1.015-.17c-.391 0-.738.063-1.04.188a1.998 1.998 0 00-.757.525c-.249.29-.436.667-.56 1.13a6.37 6.37 0 00-.178 1.592v3.069zm5.08.677v-1.833-.507-.632l-5.036 3.852c.054.433.149.816.285 1.148.136.326.314.596.534.81.201.201.445.355.73.462.284.101.604.151.96.151.374 0 .706-.056.997-.169.29-.112.536-.275.738-.489.273-.29.472-.67.596-1.139.13-.468.196-1.02.196-1.654zM6.886 49H5.24V38.146l-3.39 1.29v-1.504l4.903-1.886h.133V49zM9.493 77H1.005v-1.183L5.25 71.1c.38-.42.697-.794.952-1.12.255-.327.46-.63.614-.908.154-.273.264-.53.33-.774.064-.25.097-.504.097-.765 0-.32-.053-.62-.16-.899-.101-.284-.25-.53-.445-.738a2.162 2.162 0 00-.73-.49 2.31 2.31 0 00-.952-.186c-.432 0-.81.062-1.13.186-.314.125-.575.3-.782.525-.214.232-.374.51-.48.837-.102.326-.152.69-.152 1.094H.756c0-.546.095-1.059.285-1.54.19-.485.466-.91.827-1.271a3.9 3.9 0 011.308-.863c.522-.214 1.115-.32 1.78-.32.61 0 1.159.091 1.645.275.493.178.908.427 1.246.747.338.32.596.7.774 1.14a3.67 3.67 0 01.08 2.58c-.13.373-.305.744-.525 1.111a9.84 9.84 0 01-.783 1.095c-.29.356-.599.712-.925 1.067l-3.479 3.773h6.504V77z"
				opacity="0.5"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_4141_9873"
					x1="223.91"
					x2="313.91"
					y1="42.203"
					y2="42.203"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#E4E7EB" />
					<stop offset="1" stop-color="#818FA3" />
				</linearGradient>
			</defs>
		</svg>
	)
}

const Plus = () => {
	return (
		<div class="w-5 h-5 flex justify-center">
			<div class="bg-surface-400 w-[1px] h-full" />
			<div class="bg-surface-400 w-[1px] h-full rotate-90" />
		</div>
	)
}
