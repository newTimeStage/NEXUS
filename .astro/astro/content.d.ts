declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"civilization-roots": {
"astronomy.md": {
	id: "astronomy.md";
  slug: "astronomy";
  body: string;
  collection: "civilization-roots";
  data: any
} & { render(): Render[".md"] };
"geography.md": {
	id: "geography.md";
  slug: "geography";
  body: string;
  collection: "civilization-roots";
  data: any
} & { render(): Render[".md"] };
"human-principles.md": {
	id: "human-principles.md";
  slug: "human-principles";
  body: string;
  collection: "civilization-roots";
  data: any
} & { render(): Render[".md"] };
"introduction.md": {
	id: "introduction.md";
  slug: "introduction";
  body: string;
  collection: "civilization-roots";
  data: any
} & { render(): Render[".md"] };
};
"evolution": {
"introduction.md": {
	id: "introduction.md";
  slug: "introduction";
  body: string;
  collection: "evolution";
  data: any
} & { render(): Render[".md"] };
"timeline.md": {
	id: "timeline.md";
  slug: "timeline";
  body: string;
  collection: "evolution";
  data: any
} & { render(): Render[".md"] };
};
"future": {
"introduction.md": {
	id: "introduction.md";
  slug: "introduction";
  body: string;
  collection: "future";
  data: any
} & { render(): Render[".md"] };
};
"systems": {
"introduction.md": {
	id: "introduction.md";
  slug: "introduction";
  body: string;
  collection: "systems";
  data: any
} & { render(): Render[".md"] };
};
"主体与未来": {
"0-部序.md": {
	id: "0-部序.md";
  slug: "0-部序";
  body: string;
  collection: "主体与未来";
  data: InferEntrySchema<"主体与未来">
} & { render(): Render[".md"] };
"测试文件夹/测试文章.md": {
	id: "测试文件夹/测试文章.md";
  slug: "测试文件夹/测试文章";
  body: string;
  collection: "主体与未来";
  data: InferEntrySchema<"主体与未来">
} & { render(): Render[".md"] };
};
"制度与创造": {
"0-部序.md": {
	id: "0-部序.md";
  slug: "0-部序";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/61-燧天书/燧皇政典.md": {
	id: "政典之书/61-燧天书/燧皇政典.md";
  slug: "政典之书/61-燧天书/燧皇政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/01-羲皇政典.md": {
	id: "政典之书/63-昊天书/01-羲皇政典.md";
  slug: "政典之书/63-昊天书/01-羲皇政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/02-女娲政典.md": {
	id: "政典之书/63-昊天书/02-女娲政典.md";
  slug: "政典之书/63-昊天书/02-女娲政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/03-栗陆氏政典.md": {
	id: "政典之书/63-昊天书/03-栗陆氏政典.md";
  slug: "政典之书/63-昊天书/03-栗陆氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/11-骊连氏政典.md": {
	id: "政典之书/63-昊天书/11-骊连氏政典.md";
  slug: "政典之书/63-昊天书/11-骊连氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/12-赫胥氏政典.md": {
	id: "政典之书/63-昊天书/12-赫胥氏政典.md";
  slug: "政典之书/63-昊天书/12-赫胥氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/13-伏羲氏政典.md": {
	id: "政典之书/63-昊天书/13-伏羲氏政典.md";
  slug: "政典之书/63-昊天书/13-伏羲氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/14-尊卢氏政典.md": {
	id: "政典之书/63-昊天书/14-尊卢氏政典.md";
  slug: "政典之书/63-昊天书/14-尊卢氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/17-混沌氏政典.md": {
	id: "政典之书/63-昊天书/17-混沌氏政典.md";
  slug: "政典之书/63-昊天书/17-混沌氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/18-昊英氏政典.md": {
	id: "政典之书/63-昊天书/18-昊英氏政典.md";
  slug: "政典之书/63-昊天书/18-昊英氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/23-伏羲氏政典.md": {
	id: "政典之书/63-昊天书/23-伏羲氏政典.md";
  slug: "政典之书/63-昊天书/23-伏羲氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/26-无怀氏政典.md": {
	id: "政典之书/63-昊天书/26-无怀氏政典.md";
  slug: "政典之书/63-昊天书/26-无怀氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/63-昊天书/27-伏羲氏政典.md": {
	id: "政典之书/63-昊天书/27-伏羲氏政典.md";
  slug: "政典之书/63-昊天书/27-伏羲氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/65-炎天书/01-神农氏政典.md": {
	id: "政典之书/65-炎天书/01-神农氏政典.md";
  slug: "政典之书/65-炎天书/01-神农氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/66-黄天书/01-轩辕氏政典.md": {
	id: "政典之书/66-黄天书/01-轩辕氏政典.md";
  slug: "政典之书/66-黄天书/01-轩辕氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/68-颛顼书/01-高阳氏政典.md": {
	id: "政典之书/68-颛顼书/01-高阳氏政典.md";
  slug: "政典之书/68-颛顼书/01-高阳氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/69-喾天书/01-高辛氏政典.md": {
	id: "政典之书/69-喾天书/01-高辛氏政典.md";
  slug: "政典之书/69-喾天书/01-高辛氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/70-挚天书/01-青阳氏政典.md": {
	id: "政典之书/70-挚天书/01-青阳氏政典.md";
  slug: "政典之书/70-挚天书/01-青阳氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/71-尧天书/01-陶唐氏政典.md": {
	id: "政典之书/71-尧天书/01-陶唐氏政典.md";
  slug: "政典之书/71-尧天书/01-陶唐氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/72-虞书/01-有虞氏政典.md": {
	id: "政典之书/72-虞书/01-有虞氏政典.md";
  slug: "政典之书/72-虞书/01-有虞氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/73-夏书/01-夏后氏政典.md": {
	id: "政典之书/73-夏书/01-夏后氏政典.md";
  slug: "政典之书/73-夏书/01-夏后氏政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/74-商书/01-商政典.md": {
	id: "政典之书/74-商书/01-商政典.md";
  slug: "政典之书/74-商书/01-商政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/01-周文王政典.md": {
	id: "政典之书/75-周书/01-周文王政典.md";
  slug: "政典之书/75-周书/01-周文王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/01-晋国语/01-晋平公政典.md": {
	id: "政典之书/75-周书/01-晋国语/01-晋平公政典.md";
  slug: "政典之书/75-周书/01-晋国语/01-晋平公政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/02-周武王政典.md": {
	id: "政典之书/75-周书/02-周武王政典.md";
  slug: "政典之书/75-周书/02-周武王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/02-鲁国语/01-鲁侯伯禽政典.md": {
	id: "政典之书/75-周书/02-鲁国语/01-鲁侯伯禽政典.md";
  slug: "政典之书/75-周书/02-鲁国语/01-鲁侯伯禽政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/03-周公旦政典.md": {
	id: "政典之书/75-周书/03-周公旦政典.md";
  slug: "政典之书/75-周书/03-周公旦政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/03-秦国语/01-秦穆公政典.md": {
	id: "政典之书/75-周书/03-秦国语/01-秦穆公政典.md";
  slug: "政典之书/75-周书/03-秦国语/01-秦穆公政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/04-周成王政典.md": {
	id: "政典之书/75-周书/04-周成王政典.md";
  slug: "政典之书/75-周书/04-周成王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/05-周康王政典.md": {
	id: "政典之书/75-周书/05-周康王政典.md";
  slug: "政典之书/75-周书/05-周康王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/06-周穆王政典.md": {
	id: "政典之书/75-周书/06-周穆王政典.md";
  slug: "政典之书/75-周书/06-周穆王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/07-周厉王政典.md": {
	id: "政典之书/75-周书/07-周厉王政典.md";
  slug: "政典之书/75-周书/07-周厉王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/75-周书/08-周平王政典.md": {
	id: "政典之书/75-周书/08-周平王政典.md";
  slug: "政典之书/75-周书/08-周平王政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/77-秦书/01-秦始皇政典.md": {
	id: "政典之书/77-秦书/01-秦始皇政典.md";
  slug: "政典之书/77-秦书/01-秦始皇政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/78-汉书/02-汉文帝政典.md": {
	id: "政典之书/78-汉书/02-汉文帝政典.md";
  slug: "政典之书/78-汉书/02-汉文帝政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/78-汉书/03-汉景帝政典.md": {
	id: "政典之书/78-汉书/03-汉景帝政典.md";
  slug: "政典之书/78-汉书/03-汉景帝政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/78-汉书/04-汉武帝政典.md": {
	id: "政典之书/78-汉书/04-汉武帝政典.md";
  slug: "政典之书/78-汉书/04-汉武帝政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/82-明书/01-明太祖政典.md": {
	id: "政典之书/82-明书/01-明太祖政典.md";
  slug: "政典之书/82-明书/01-明太祖政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/01-清太祖政典.md": {
	id: "政典之书/83-清书/01-清太祖政典.md";
  slug: "政典之书/83-清书/01-清太祖政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/02-清太宗政典.md": {
	id: "政典之书/83-清书/02-清太宗政典.md";
  slug: "政典之书/83-清书/02-清太宗政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/03-清世祖政典.md": {
	id: "政典之书/83-清书/03-清世祖政典.md";
  slug: "政典之书/83-清书/03-清世祖政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/08-清宣宗政典.md": {
	id: "政典之书/83-清书/08-清宣宗政典.md";
  slug: "政典之书/83-清书/08-清宣宗政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/11-清德宗政典.md": {
	id: "政典之书/83-清书/11-清德宗政典.md";
  slug: "政典之书/83-清书/11-清德宗政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/83-清书/12-清宣统政典.md": {
	id: "政典之书/83-清书/12-清宣统政典.md";
  slug: "政典之书/83-清书/12-清宣统政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/01-国父孙中山政典.md": {
	id: "政典之书/84-民书/01-国父孙中山政典.md";
  slug: "政典之书/84-民书/01-国父孙中山政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/02-同盟会政典.md": {
	id: "政典之书/84-民书/02-同盟会政典.md";
  slug: "政典之书/84-民书/02-同盟会政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/03-中华民国军政府政典.md": {
	id: "政典之书/84-民书/03-中华民国军政府政典.md";
  slug: "政典之书/84-民书/03-中华民国军政府政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/04-中华民国临时政府政典.md": {
	id: "政典之书/84-民书/04-中华民国临时政府政典.md";
  slug: "政典之书/84-民书/04-中华民国临时政府政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/05-中国国民党先总理孙逸仙政典.md": {
	id: "政典之书/84-民书/05-中国国民党先总理孙逸仙政典.md";
  slug: "政典之书/84-民书/05-中国国民党先总理孙逸仙政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/84-民书/06-中国国民党蒋中正政典.md": {
	id: "政典之书/84-民书/06-中国国民党蒋中正政典.md";
  slug: "政典之书/84-民书/06-中国国民党蒋中正政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
"政典之书/85-共书/01-中国共产党毛主席政典.md": {
	id: "政典之书/85-共书/01-中国共产党毛主席政典.md";
  slug: "政典之书/85-共书/01-中国共产党毛主席政典";
  body: string;
  collection: "制度与创造";
  data: InferEntrySchema<"制度与创造">
} & { render(): Render[".md"] };
};
"文明根基": {
"0-部序.md": {
	id: "0-部序.md";
  slug: "0-部序";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"天学.md": {
	id: "天学.md";
  slug: "天学";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"测试文件夹/test-markdown.md": {
	id: "测试文件夹/test-markdown.md";
  slug: "测试文件夹/test-markdown";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"测试文件夹/人正论.md": {
	id: "测试文件夹/人正论.md";
  slug: "测试文件夹/人正论";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"测试文件夹/地理志.md": {
	id: "测试文件夹/地理志.md";
  slug: "测试文件夹/地理志";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"测试文件夹/天文传.md": {
	id: "测试文件夹/天文传.md";
  slug: "测试文件夹/天文传";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
"测试项目符号列表.md": {
	id: "测试项目符号列表.md";
  slug: "测试项目符号列表";
  body: string;
  collection: "文明根基";
  data: InferEntrySchema<"文明根基">
} & { render(): Render[".md"] };
};
"演进轨迹": {
"0-部序.md": {
	id: "0-部序.md";
  slug: "0-部序";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/01-元始纪/07-九宫代/1-盘古氏/1-盘古世本.md": {
	id: "事册之载/01-元始纪/07-九宫代/1-盘古氏/1-盘古世本.md";
  slug: "事册之载/01-元始纪/07-九宫代/1-盘古氏/1-盘古世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/01-元始纪/08-元皇代/1-提挺氏/1-提挺世本.md": {
	id: "事册之载/01-元始纪/08-元皇代/1-提挺氏/1-提挺世本.md";
  slug: "事册之载/01-元始纪/08-元皇代/1-提挺氏/1-提挺世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/01-元始纪/元始纪纲.md": {
	id: "事册之载/01-元始纪/元始纪纲.md";
  slug: "事册之载/01-元始纪/元始纪纲";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/上章氏/上章氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/上章氏/上章氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/上章氏/上章氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/天皇世本.md": {
	id: "事册之载/02-二靈纪/01-天皇代/天皇世本.md";
  slug: "事册之载/02-二靈纪/01-天皇代/天皇世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/屠维氏/屠维氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/屠维氏/屠维氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/屠维氏/屠维氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/州献氏/州献氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/州献氏/州献氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/州献氏/州献氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/强圉氏/强圉氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/强圉氏/强圉氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/强圉氏/强圉氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/旃蒙氏/旃蒙氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/旃蒙氏/旃蒙氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/旃蒙氏/旃蒙氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/昭陽氏/昭陽氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/昭陽氏/昭陽氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/昭陽氏/昭陽氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/柔兆氏/柔兆氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/柔兆氏/柔兆氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/柔兆氏/柔兆氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/玄黓氏/玄黓氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/玄黓氏/玄黓氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/玄黓氏/玄黓氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/著雍氏/著雍氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/著雍氏/著雍氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/著雍氏/著雍氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/重光氏/重光氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/重光氏/重光氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/重光氏/重光氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/阉茂氏/阉茂氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/阉茂氏/阉茂氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/阉茂氏/阉茂氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/01-天皇代/阏逢氏/阏逢氏列.md": {
	id: "事册之载/02-二靈纪/01-天皇代/阏逢氏/阏逢氏列.md";
  slug: "事册之载/02-二靈纪/01-天皇代/阏逢氏/阏逢氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地世氏/地世氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地世氏/地世氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地世氏/地世氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地创氏/地创氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地创氏/地创氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地创氏/地创氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地制氏/地制氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地制氏/地制氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地制氏/地制氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地垂氏/地垂氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地垂氏/地垂氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地垂氏/地垂氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地憲氏/地憲氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地憲氏/地憲氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地憲氏/地憲氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地永氏/地永氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地永氏/地永氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地永氏/地永氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地法氏/地法氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地法氏/地法氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地法氏/地法氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地皇世本.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地皇世本.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地皇世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地萬氏/地萬氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地萬氏/地萬氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地萬氏/地萬氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地诸氏/地诸氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地诸氏/地诸氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地诸氏/地诸氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地辰氏/地辰氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地辰氏/地辰氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地辰氏/地辰氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/02-地皇代/地铿氏/地铿氏列.md": {
	id: "事册之载/02-二靈纪/02-地皇代/地铿氏/地铿氏列.md";
  slug: "事册之载/02-二靈纪/02-地皇代/地铿氏/地铿氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/02-二靈纪/二靈纪纲.md": {
	id: "事册之载/02-二靈纪/二靈纪纲.md";
  slug: "事册之载/02-二靈纪/二靈纪纲";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/01-泰皇代/01-人皇氏/人皇氏列.md": {
	id: "事册之载/03-九頭纪/01-泰皇代/01-人皇氏/人皇氏列.md";
  slug: "事册之载/03-九頭纪/01-泰皇代/01-人皇氏/人皇氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/人皇世本.md": {
	id: "事册之载/03-九頭纪/02-人皇代/人皇世本.md";
  slug: "事册之载/03-九頭纪/02-人皇代/人皇世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天任氏/天任氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天任氏/天任氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天任氏/天任氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天心氏/天心氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天心氏/天心氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天心氏/天心氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天柱氏/天柱氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天柱氏/天柱氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天柱氏/天柱氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天沖氏/天沖氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天沖氏/天沖氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天沖氏/天沖氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天禽氏/天禽氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天禽氏/天禽氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天禽氏/天禽氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天芮氏/天芮氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天芮氏/天芮氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天芮氏/天芮氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天英氏/天英氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天英氏/天英氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天英氏/天英氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天蓬氏/天蓬氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天蓬氏/天蓬氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天蓬氏/天蓬氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/03-九頭纪/02-人皇代/天輔氏/天輔氏列.md": {
	id: "事册之载/03-九頭纪/02-人皇代/天輔氏/天輔氏列.md";
  slug: "事册之载/03-九頭纪/02-人皇代/天輔氏/天輔氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/04-五龍纪/01-五龍代/仲徵氏/仲徵氏列.md": {
	id: "事册之载/04-五龍纪/01-五龍代/仲徵氏/仲徵氏列.md";
  slug: "事册之载/04-五龍纪/01-五龍代/仲徵氏/仲徵氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/04-五龍纪/01-五龍代/伯角氏/伯角氏列.md": {
	id: "事册之载/04-五龍纪/01-五龍代/伯角氏/伯角氏列.md";
  slug: "事册之载/04-五龍纪/01-五龍代/伯角氏/伯角氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/04-五龍纪/01-五龍代/叔商氏/叔商氏列.md": {
	id: "事册之载/04-五龍纪/01-五龍代/叔商氏/叔商氏列.md";
  slug: "事册之载/04-五龍纪/01-五龍代/叔商氏/叔商氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/04-五龍纪/01-五龍代/季羽氏/季羽氏列.md": {
	id: "事册之载/04-五龍纪/01-五龍代/季羽氏/季羽氏列.md";
  slug: "事册之载/04-五龍纪/01-五龍代/季羽氏/季羽氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/04-五龍纪/01-五龍代/少宫氏/少宫氏列.md": {
	id: "事册之载/04-五龍纪/01-五龍代/少宫氏/少宫氏列.md";
  slug: "事册之载/04-五龍纪/01-五龍代/少宫氏/少宫氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/九渠氏/九渠氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/九渠氏/九渠氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/九渠氏/九渠氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/仲行氏/仲行氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/仲行氏/仲行氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/仲行氏/仲行氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/伊祁氏/伊祁氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/伊祁氏/伊祁氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/伊祁氏/伊祁氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/伊耆氏/伊耆氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/伊耆氏/伊耆氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/伊耆氏/伊耆氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/何拔氏/何拔氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/何拔氏/何拔氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/何拔氏/何拔氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/俟斤氏/俟斤氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/俟斤氏/俟斤氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/俟斤氏/俟斤氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/公儀氏/公儀氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/公儀氏/公儀氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/公儀氏/公儀氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/公尚氏/公尚氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/公尚氏/公尚氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/公尚氏/公尚氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/公綦氏/公綦氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/公綦氏/公綦氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/公綦氏/公綦氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/剞劂氏/剞劂氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/剞劂氏/剞劂氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/剞劂氏/剞劂氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/叔先氏/叔先氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/叔先氏/叔先氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/叔先氏/叔先氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/史桑氏/史桑氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/史桑氏/史桑氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/史桑氏/史桑氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/合方氏/合方氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/合方氏/合方氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/合方氏/合方氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/夫己氏/夫己氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/夫己氏/夫己氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/夫己氏/夫己氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/央皇氏/央皇氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/央皇氏/央皇氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/央皇氏/央皇氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/女皇氏/女皇氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/女皇氏/女皇氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/女皇氏/女皇氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/妸荷氏/妸荷氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/妸荷氏/妸荷氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/妸荷氏/妸荷氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/定連氏/定連氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/定連氏/定連氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/定連氏/定連氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/宰父氏/宰父氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/宰父氏/宰父氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/宰父氏/宰父氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/容成氏/容成氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/容成氏/容成氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/容成氏/容成氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/巨凌氏/巨凌氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/巨凌氏/巨凌氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/巨凌氏/巨凌氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/幾遽氏/幾遽氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/幾遽氏/幾遽氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/幾遽氏/幾遽氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/弋门氏/弋门氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/弋门氏/弋门氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/弋门氏/弋门氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/形方氏/形方氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/形方氏/形方氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/形方氏/形方氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/拒邱氏/拒邱氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/拒邱氏/拒邱氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/拒邱氏/拒邱氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/方雷氏/方雷氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/方雷氏/方雷氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/方雷氏/方雷氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/昆連氏/昆連氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/昆連氏/昆連氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/昆連氏/昆連氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/昊英氏/昊英氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/昊英氏/昊英氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/昊英氏/昊英氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/朱襄氏/朱襄氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/朱襄氏/朱襄氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/朱襄氏/朱襄氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/條狼氏/條狼氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/條狼氏/條狼氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/條狼氏/條狼氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/棘壹氏/棘壹氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/棘壹氏/棘壹氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/棘壹氏/棘壹氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/棘扈氏/棘扈氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/棘扈氏/棘扈氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/棘扈氏/棘扈氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/榮伯氏/榮伯氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/榮伯氏/榮伯氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/榮伯氏/榮伯氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/武都氏/武都氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/武都氏/武都氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/武都氏/武都氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/泠淪氏/泠淪氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/泠淪氏/泠淪氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/泠淪氏/泠淪氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/泰運氏/泰運氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/泰運氏/泰運氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/泰運氏/泰運氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/涿方氏/涿方氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/涿方氏/涿方氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/涿方氏/涿方氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/清陽氏/清陽氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/清陽氏/清陽氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/清陽氏/清陽氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/渾敦氏/渾敦氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/渾敦氏/渾敦氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/渾敦氏/渾敦氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/犁盧氏/犁盧氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/犁盧氏/犁盧氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/犁盧氏/犁盧氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/猗韋氏/猗韋氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/猗韋氏/猗韋氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/猗韋氏/猗韋氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/由準氏/由準氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/由準氏/由準氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/由準氏/由準氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/相皇氏/相皇氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/相皇氏/相皇氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/相皇氏/相皇氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/砂佗氏/砂佗氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/砂佗氏/砂佗氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/砂佗氏/砂佗氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/祝其氏/祝其氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/祝其氏/祝其氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/祝其氏/祝其氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/谷渾氏/谷渾氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/谷渾氏/谷渾氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/谷渾氏/谷渾氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/豕韋氏/豕韋氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/豕韋氏/豕韋氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/豕韋氏/豕韋氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/豗隗氏/豗隗氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/豗隗氏/豗隗氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/豗隗氏/豗隗氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/赫胥氏/赫胥氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/赫胥氏/赫胥氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/赫胥氏/赫胥氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/郊尹氏/郊尹氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/郊尹氏/郊尹氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/郊尹氏/郊尹氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/郏敖氏/郏敖氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/郏敖氏/郏敖氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/郏敖氏/郏敖氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/金天氏/金天氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/金天氏/金天氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/金天氏/金天氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/阿羅氏/阿羅氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/阿羅氏/阿羅氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/阿羅氏/阿羅氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/陸终氏/陸终氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/陸终氏/陸终氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/陸终氏/陸终氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/隂康氏/隂康氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/隂康氏/隂康氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/隂康氏/隂康氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/青鳥氏/青鳥氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/青鳥氏/青鳥氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/青鳥氏/青鳥氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/鞮鞻氏/鞮鞻氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/鞮鞻氏/鞮鞻氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/鞮鞻氏/鞮鞻氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/05-摄提纪/01-五九代/鬼魁氏/鬼魁氏列.md": {
	id: "事册之载/05-摄提纪/01-五九代/鬼魁氏/鬼魁氏列.md";
  slug: "事册之载/05-摄提纪/01-五九代/鬼魁氏/鬼魁氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/06-合雒纪/01-泰壹朝代/01-有巢氏/有巢氏纪.md": {
	id: "事册之载/06-合雒纪/01-泰壹朝代/01-有巢氏/有巢氏纪.md";
  slug: "事册之载/06-合雒纪/01-泰壹朝代/01-有巢氏/有巢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/06-合雒纪/合雒纪纲.md": {
	id: "事册之载/06-合雒纪/合雒纪纲.md";
  slug: "事册之载/06-合雒纪/合雒纪纲";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/07-連通纪/05-燧人朝代/01-燧人氏/燧人氏纪.md": {
	id: "事册之载/07-連通纪/05-燧人朝代/01-燧人氏/燧人氏纪.md";
  slug: "事册之载/07-連通纪/05-燧人朝代/01-燧人氏/燧人氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/00-太昊世本.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/00-太昊世本.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/00-太昊世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/01-伏羲氏/01-太昊天上帝伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/01-伏羲氏/01-太昊天上帝伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/01-伏羲氏/01-太昊天上帝伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/01-昊天二世女皇女娲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/01-昊天二世女皇女娲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/01-昊天二世女皇女娲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/02-昊天三世女皇嬟移女娲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/02-昊天三世女皇嬟移女娲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/02-昊天三世女皇嬟移女娲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/03-昊天四世帝师嬟女娲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/03-昊天四世帝师嬟女娲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/02-女娲氏/03-昊天四世帝师嬟女娲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/01-昊天五世帝昊义伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/01-昊天五世帝昊义伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/01-昊天五世帝昊义伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/02-昊天六世帝昊嬟伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/02-昊天六世帝昊嬟伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/02-昊天六世帝昊嬟伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/03-昊天七世帝俊伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/03-昊天七世帝俊伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/03-昊天七世帝俊伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/04-昊天八世帝嬑节伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/04-昊天八世帝嬑节伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/04-昊天八世帝嬑节伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/05-昊天九世帝伏泰伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/05-昊天九世帝伏泰伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/05-昊天九世帝伏泰伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/06-昊天十世帝羲暤伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/06-昊天十世帝羲暤伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/06-昊天十世帝羲暤伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/07-昊天十一世帝印矛伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/07-昊天十一世帝印矛伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/03-伏羲氏/07-昊天十一世帝印矛伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/01-昊天十二世帝新印大庭氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/01-昊天十二世帝新印大庭氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/01-昊天十二世帝新印大庭氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/02-昊天十三世帝姯印大庭氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/02-昊天十三世帝姯印大庭氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/02-昊天十三世帝姯印大庭氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/03-昊天十四世帝随象大庭氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/03-昊天十四世帝随象大庭氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/04-大庭氏/03-昊天十四世帝随象大庭氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/01-昊天十五世帝伏显柏皇氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/01-昊天十五世帝伏显柏皇氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/01-昊天十五世帝伏显柏皇氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/02-昊天十六世帝可塑柏皇氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/02-昊天十六世帝可塑柏皇氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/02-昊天十六世帝可塑柏皇氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/03-昊天十七世帝郁莟柏皇氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/03-昊天十七世帝郁莟柏皇氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/03-昊天十七世帝郁莟柏皇氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/04-昊天十八世帝畲蓄柏皇氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/04-昊天十八世帝畲蓄柏皇氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/05-柏皇氏/04-昊天十八世帝畲蓄柏皇氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/06-伏羲氏/01-昊天十九世帝象团伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/06-伏羲氏/01-昊天十九世帝象团伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/06-伏羲氏/01-昊天十九世帝象团伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/01-昊天二十世帝象伟中央氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/01-昊天二十世帝象伟中央氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/01-昊天二十世帝象伟中央氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/02-昊天廿一世帝节触中央氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/02-昊天廿一世帝节触中央氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/02-昊天廿一世帝节触中央氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/03-昊天廿二世帝伏案中央氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/03-昊天廿二世帝伏案中央氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/03-昊天廿二世帝伏案中央氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/04-昊天廿三世帝曲秦中央氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/04-昊天廿三世帝曲秦中央氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/04-昊天廿三世帝曲秦中央氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/05-昊天廿四世帝随秦中央氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/05-昊天廿四世帝随秦中央氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/07-中央氏/05-昊天廿四世帝随秦中央氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/08-伏羲氏/01-昊天廿五世帝晁安伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/08-伏羲氏/01-昊天廿五世帝晁安伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/08-伏羲氏/01-昊天廿五世帝晁安伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/01-昊天廿六世帝伏安栗陆氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/01-昊天廿六世帝伏安栗陆氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/01-昊天廿六世帝伏安栗陆氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/02-昊天廿七世帝起望栗陆氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/02-昊天廿七世帝起望栗陆氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/02-昊天廿七世帝起望栗陆氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/03-昊天廿八世帝河圭栗陆氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/03-昊天廿八世帝河圭栗陆氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/09-栗陆氏/03-昊天廿八世帝河圭栗陆氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/10-伏羲氏/01-昊天廿九世帝圭嬜伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/10-伏羲氏/01-昊天廿九世帝圭嬜伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/10-伏羲氏/01-昊天廿九世帝圭嬜伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/01-昊天三十世帝泰望骊连氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/01-昊天三十世帝泰望骊连氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/01-昊天三十世帝泰望骊连氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/02-昊天卅一世帝施公骊连氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/02-昊天卅一世帝施公骊连氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/02-昊天卅一世帝施公骊连氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/03-昊天卅二世帝团良骊连氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/03-昊天卅二世帝团良骊连氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/03-昊天卅二世帝团良骊连氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/04-昊天卅三世帝冠象骊连氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/04-昊天卅三世帝冠象骊连氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/04-昊天卅三世帝冠象骊连氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/05-昊天卅四世帝团伏骊连氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/05-昊天卅四世帝团伏骊连氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/11-骊连氏/05-昊天卅四世帝团伏骊连氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/01-昊天卅五世帝伏义赫胥氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/01-昊天卅五世帝伏义赫胥氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/01-昊天卅五世帝伏义赫胥氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/02-昊天卅六世帝娍义赫胥氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/02-昊天卅六世帝娍义赫胥氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/02-昊天卅六世帝娍义赫胥氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/03-昊天卅七世帝肆杤赫胥氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/03-昊天卅七世帝肆杤赫胥氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/03-昊天卅七世帝肆杤赫胥氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/04-昊天卅八世帝归纹赫胥氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/04-昊天卅八世帝归纹赫胥氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/04-昊天卅八世帝归纹赫胥氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/05-昊天卅九世帝伏秧赫胥氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/05-昊天卅九世帝伏秧赫胥氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/12-赫胥氏/05-昊天卅九世帝伏秧赫胥氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/13-伏羲氏/01-昊天四十世帝团暤伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/13-伏羲氏/01-昊天四十世帝团暤伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/13-伏羲氏/01-昊天四十世帝团暤伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/01-昊天卌一世帝秦矛尊卢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/01-昊天卌一世帝秦矛尊卢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/01-昊天卌一世帝秦矛尊卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/02-昊天卌二世帝革池尊卢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/02-昊天卌二世帝革池尊卢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/02-昊天卌二世帝革池尊卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/03-昊天卌三世帝矛兰尊卢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/03-昊天卌三世帝矛兰尊卢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/03-昊天卌三世帝矛兰尊卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/04-昊天卌四世帝三那尊卢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/04-昊天卌四世帝三那尊卢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/04-昊天卌四世帝三那尊卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/05-昊天卌五世帝革兰尊卢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/05-昊天卌五世帝革兰尊卢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/14-尊卢氏/05-昊天卌五世帝革兰尊卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/01-昊天卌六帝赤禅祝融氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/01-昊天卌六帝赤禅祝融氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/01-昊天卌六帝赤禅祝融氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/02-昊天卌七帝洛矛祝融氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/02-昊天卌七帝洛矛祝融氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/02-昊天卌七帝洛矛祝融氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/03-昊天卌八帝附前祝融氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/03-昊天卌八帝附前祝融氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/03-昊天卌八帝附前祝融氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/04-昊天卌九帝洛前祝融氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/04-昊天卌九帝洛前祝融氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/15-祝融氏/04-昊天卌九帝洛前祝融氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/16-伏羲氏/01-昊天五十帝桑味伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/16-伏羲氏/01-昊天五十帝桑味伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/16-伏羲氏/01-昊天五十帝桑味伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/01-昊天五十一帝伏纪混沌氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/01-昊天五十一帝伏纪混沌氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/01-昊天五十一帝伏纪混沌氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/02-昊天五十二帝随嬄混沌氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/02-昊天五十二帝随嬄混沌氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/02-昊天五十二帝随嬄混沌氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/03-昊天五十三帝鹏烁混沌氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/03-昊天五十三帝鹏烁混沌氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/03-昊天五十三帝鹏烁混沌氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/04-昊天五十四帝茜河混沌氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/04-昊天五十四帝茜河混沌氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/17-混沌氏/04-昊天五十四帝茜河混沌氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/01-昊天五十五帝规辛昊英氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/01-昊天五十五帝规辛昊英氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/01-昊天五十五帝规辛昊英氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/02-昊天五十六帝金乌昊英氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/02-昊天五十六帝金乌昊英氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/02-昊天五十六帝金乌昊英氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/03-昊天五十七帝掮师昊英氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/03-昊天五十七帝掮师昊英氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/18-昊英氏/03-昊天五十七帝掮师昊英氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/19-伏羲氏/01-昊天五十八帝雪河伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/19-伏羲氏/01-昊天五十八帝雪河伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/19-伏羲氏/01-昊天五十八帝雪河伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/01-昊天五十九帝汝信有巢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/01-昊天五十九帝汝信有巢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/01-昊天五十九帝汝信有巢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/02-昊天六十帝罗秦有巢氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/02-昊天六十帝罗秦有巢氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/20-有巢氏/02-昊天六十帝罗秦有巢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/01-昊天六十一帝诰葛天氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/01-昊天六十一帝诰葛天氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/01-昊天六十一帝诰葛天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/02-昊天六十二帝峙龙葛天氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/02-昊天六十二帝峙龙葛天氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/02-昊天六十二帝峙龙葛天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/03-昊天六十三帝达河葛天氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/03-昊天六十三帝达河葛天氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/21-葛天氏/03-昊天六十三帝达河葛天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/01-昊天六十四帝荷曲阴康氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/01-昊天六十四帝荷曲阴康氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/01-昊天六十四帝荷曲阴康氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/02-昊天六十五帝达耳阴康氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/02-昊天六十五帝达耳阴康氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/02-昊天六十五帝达耳阴康氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/03-昊天六十六帝媒兰阴康氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/03-昊天六十六帝媒兰阴康氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/03-昊天六十六帝媒兰阴康氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/04-昊天六十七帝立路阴康氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/04-昊天六十七帝立路阴康氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/22-阴康氏/04-昊天六十七帝立路阴康氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/23-伏羲氏/01-昊天六十八帝因康伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/23-伏羲氏/01-昊天六十八帝因康伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/23-伏羲氏/01-昊天六十八帝因康伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/01-昊天六十九帝墙烁朱襄氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/01-昊天六十九帝墙烁朱襄氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/01-昊天六十九帝墙烁朱襄氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/02-昊天七十帝泽治朱襄氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/02-昊天七十帝泽治朱襄氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/24-朱襄氏/02-昊天七十帝泽治朱襄氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/25-伏羲氏/01-昊天七十一帝渭茂伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/25-伏羲氏/01-昊天七十一帝渭茂伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/25-伏羲氏/01-昊天七十一帝渭茂伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/01-昊天七十二帝苍芒无怀氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/01-昊天七十二帝苍芒无怀氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/01-昊天七十二帝苍芒无怀氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/02-昊天七十三帝节曲无怀氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/02-昊天七十三帝节曲无怀氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/26-无怀氏/02-昊天七十三帝节曲无怀氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/00-少典轩辕氏列.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/00-少典轩辕氏列.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/00-少典轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/01-少典轩辕一世猷矛术传.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/01-少典轩辕一世猷矛术传.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/01-少典轩辕一世猷矛术传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/02-少典轩辕二世猷茴芒传.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/02-少典轩辕二世猷茴芒传.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/02-少典轩辕二世猷茴芒传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/03-少典轩辕三世猷赤哲传.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/03-少典轩辕三世猷赤哲传.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-少典轩辕氏/03-少典轩辕三世猷赤哲传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-昊天七十四帝和伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-昊天七十四帝和伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/01-昊天七十四帝和伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-昊天七十五帝节伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-昊天七十五帝节伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-昊天七十五帝节伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-柱下史共工氏列/01-柱下史共工氏列.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-柱下史共工氏列/01-柱下史共工氏列.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/02-柱下史共工氏列/01-柱下史共工氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/03-昊天七十六帝太河伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/03-昊天七十六帝太河伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/03-昊天七十六帝太河伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/04-昊天七十七帝大耀伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/04-昊天七十七帝大耀伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/04-昊天七十七帝大耀伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/05-昊天七十八帝节芒伏羲氏纪.md": {
	id: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/05-昊天七十八帝节芒伏羲氏纪.md";
  slug: "事册之载/11-禪通纪/01-伏羲朝代/27-伏羲氏/05-昊天七十八帝节芒伏羲氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/00-炎天世本.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/00-炎天世本.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/00-炎天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-炎天一世帝魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-炎天一世帝魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-炎天一世帝魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/01-魁隗四世酋伯陵列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/01-魁隗四世酋伯陵列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/01-魁隗四世酋伯陵列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/02-魁隗五世猷灵恝传.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/02-魁隗五世猷灵恝传.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/01-魁隗氏/02-魁隗五世猷灵恝传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-炎天二世帝炎居魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-炎天二世帝炎居魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-炎天二世帝炎居魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/01-祝融十六世猷西岳之传.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/01-祝融十六世猷西岳之传.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/01-祝融十六世猷西岳之传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/02-祝融十七世猷先龙之传.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/02-祝融十七世猷先龙之传.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/02-祝融十七世猷先龙之传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/03-祝融十七世猷羌戎之传.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/03-祝融十七世猷羌戎之传.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/02-祝融氏/03-祝融十七世猷羌戎之传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/03-炎天三世帝节并魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/03-炎天三世帝节并魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/03-炎天三世帝节并魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/04-炎天四世帝戏器魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/04-炎天四世帝戏器魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/04-炎天四世帝戏器魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/05-炎天五世帝祝融魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/05-炎天五世帝祝融魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/05-炎天五世帝祝融魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/06-炎天六世帝共工魁隗氏纪.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/06-炎天六世帝共工魁隗氏纪.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/06-炎天六世帝共工魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/07-魁隗七世酋句龙祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/07-魁隗七世酋句龙祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/07-魁隗七世酋句龙祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/08-魁隗八世酋噎鸣祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/08-魁隗八世酋噎鸣祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/08-魁隗八世酋噎鸣祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/09-魁隗九世酋信祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/09-魁隗九世酋信祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/09-魁隗九世酋信祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/10-魁隗十世酋赤鸠祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/10-魁隗十世酋赤鸠祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/10-魁隗十世酋赤鸠祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/11-魁隗十一世酋墙夷祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/11-魁隗十一世酋墙夷祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/11-魁隗十一世酋墙夷祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/12-魁隗十二世酋捷个祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/12-魁隗十二世酋捷个祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/12-魁隗十二世酋捷个祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/13-魁隗十三世酋笪祝融氏列.md": {
	id: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/13-魁隗十三世酋笪祝融氏列.md";
  slug: "事册之载/11-禪通纪/02-魁隗朝代/01-魁隗氏/13-魁隗十三世酋笪祝融氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-三苗氏/01-三苗氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-三苗氏/01-三苗氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-三苗氏/01-三苗氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-炎天七世帝羭纥神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-炎天七世帝羭纥神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/01-炎天七世帝羭纥神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/02-炎天八世帝临魁神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/02-炎天八世帝临魁神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/02-炎天八世帝临魁神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/03-炎天九世帝承神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/03-炎天九世帝承神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/03-炎天九世帝承神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/04-炎天十世帝明神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/04-炎天十世帝明神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/04-炎天十世帝明神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/05-炎天十一世帝宜神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/05-炎天十一世帝宜神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/05-炎天十一世帝宜神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/06-炎天十二世帝来神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/06-炎天十二世帝来神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/06-炎天十二世帝来神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/07-炎天十三世帝克神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/07-炎天十三世帝克神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/07-炎天十三世帝克神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/01-神農氏/08-炎天十四世帝榆罔神农氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/08-炎天十四世帝榆罔神农氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/01-神農氏/08-炎天十四世帝榆罔神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/02-史皇仓颉氏/01-史皇仓颉氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/02-史皇仓颉氏/01-史皇仓颉氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/02-史皇仓颉氏/01-史皇仓颉氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/03-九黎氏/00-九黎氏纪.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/00-九黎氏纪.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/00-九黎氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/03-九黎氏/01-九黎一世帝虺九黎氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/01-九黎一世帝虺九黎氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/01-九黎一世帝虺九黎氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/03-九黎氏/02-九黎二世帝吼九黎氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/02-九黎二世帝吼九黎氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/02-九黎二世帝吼九黎氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/03-九黎氏/03-九黎三世帝蚩尤九黎氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/03-九黎三世帝蚩尤九黎氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/03-九黎氏/03-九黎三世帝蚩尤九黎氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/01-少典轩辕四世酋大迥轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/01-少典轩辕四世酋大迥轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/01-少典轩辕四世酋大迥轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/02-少典轩辕五世酋黄轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/02-少典轩辕五世酋黄轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/02-少典轩辕五世酋黄轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/03-少典轩辕六世酋大号轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/03-少典轩辕六世酋大号轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/03-少典轩辕六世酋大号轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/04-少典轩辕七世酋节过轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/04-少典轩辕七世酋节过轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/04-少典轩辕七世酋节过轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/05-少典轩辕八世酋号泽轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/05-少典轩辕八世酋号泽轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/05-少典轩辕八世酋号泽轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/06-少典轩辕九世酋葛应轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/06-少典轩辕九世酋葛应轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/06-少典轩辕九世酋葛应轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/07-少典轩辕十世酋回样轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/07-少典轩辕十世酋回样轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/07-少典轩辕十世酋回样轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/08-少典轩辕氏十一世酋昌奎轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/08-少典轩辕氏十一世酋昌奎轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/08-少典轩辕氏十一世酋昌奎轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/09-少典轩辕十二世酋象爻轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/09-少典轩辕十二世酋象爻轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/09-少典轩辕十二世酋象爻轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/10-少典轩辕十三世酋连邦轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/10-少典轩辕十三世酋连邦轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/10-少典轩辕十三世酋连邦轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/11-少典轩辕十四世酋邦卉轩辕氏列.md": {
	id: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/11-少典轩辕十四世酋邦卉轩辕氏列.md";
  slug: "事册之载/11-禪通纪/03-神農朝代/04-少典轩辕氏/11-少典轩辕十四世酋邦卉轩辕氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/00-黄天世本.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/00-黄天世本.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/00-黄天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/01-九黎四世大帝蚩啄列.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/01-九黎四世大帝蚩啄列.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/01-九黎四世大帝蚩啄列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/02-九黎五世帝回虻蚩尤氏列.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/02-九黎五世帝回虻蚩尤氏列.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/02-九黎五世帝回虻蚩尤氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/03-九黎六世帝螭蚩尤氏列.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/03-九黎六世帝螭蚩尤氏列.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/03-九黎六世帝螭蚩尤氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/04-九黎七世帝蚦蚩尤氏列.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/04-九黎七世帝蚦蚩尤氏列.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-九黎蚩尤氏/04-九黎七世帝蚦蚩尤氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-黄天一世帝芒轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-黄天一世帝芒轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/01-黄天一世帝芒轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/02-黄天二世帝蔡轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/02-黄天二世帝蔡轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/02-黄天二世帝蔡轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/03-黄天三世帝豕轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/03-黄天三世帝豕轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/03-黄天三世帝豕轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/04-黄天四世帝本轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/04-黄天四世帝本轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/04-黄天四世帝本轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/05-黄天五世帝常轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/05-黄天五世帝常轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/05-黄天五世帝常轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/06-黄天六世帝号轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/06-黄天六世帝号轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/06-黄天六世帝号轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/07-黄天七世帝咁轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/07-黄天七世帝咁轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/07-黄天七世帝咁轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/08-黄天八世帝转茸轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/08-黄天八世帝转茸轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/08-黄天八世帝转茸轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/09-黄天九世帝贯俞轩辕世纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/09-黄天九世帝贯俞轩辕世纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/09-黄天九世帝贯俞轩辕世纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/10-黄天十世帝恚文祝融氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/10-黄天十世帝恚文祝融氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/10-黄天十世帝恚文祝融氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/11-黄天十一世帝成契魁隗氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/11-黄天十一世帝成契魁隗氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/11-黄天十一世帝成契魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/12-黄天十二世帝仡谅魁隗氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/12-黄天十二世帝仡谅魁隗氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/12-黄天十二世帝仡谅魁隗氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/13-黄天十三世帝江阳参卢氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/13-黄天十三世帝江阳参卢氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/13-黄天十三世帝江阳参卢氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/14-黄天十四世帝昌块轩辕氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/14-黄天十四世帝昌块轩辕氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/14-黄天十四世帝昌块轩辕氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/15-黄天十五世帝号次神农氏纪.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/15-黄天十五世帝号次神农氏纪.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/01-軒轅氏/15-黄天十五世帝号次神农氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/01-軒轅朝代/03-《史记》五帝本纪·黄帝.md": {
	id: "事册之载/12-疏仡纪/01-軒轅朝代/03-《史记》五帝本纪·黄帝.md";
  slug: "事册之载/12-疏仡纪/01-軒轅朝代/03-史记五帝本纪黄帝";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-少昊世本.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-少昊世本.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-少昊世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/01-少昊一世帝清喾金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/01-少昊一世帝清喾金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/01-少昊一世帝清喾金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/02-少昊二世帝犬金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/02-少昊二世帝犬金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/02-少昊二世帝犬金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/03-少昊三世帝箐金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/03-少昊三世帝箐金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/03-少昊三世帝箐金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/04-少昊四世帝旸珢金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/04-少昊四世帝旸珢金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/04-少昊四世帝旸珢金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/05-少昊五世帝琨金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/05-少昊五世帝琨金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/05-少昊五世帝琨金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/06-少昊六世帝畅楑金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/06-少昊六世帝畅楑金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/06-少昊六世帝畅楑金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/02-金天朝代/01-金天氏/07-少昊七世帝匠敬金天氏纪.md": {
	id: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/07-少昊七世帝匠敬金天氏纪.md";
  slug: "事册之载/12-疏仡纪/02-金天朝代/01-金天氏/07-少昊七世帝匠敬金天氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-颛顼世本.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-颛顼世本.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-颛顼世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/01-颛顼一世帝颛顼高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/01-颛顼一世帝颛顼高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/01-颛顼一世帝颛顼高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/02-颛顼二世帝宥个高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/02-颛顼二世帝宥个高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/02-颛顼二世帝宥个高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/03-颛顼三世帝焙央高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/03-颛顼三世帝焙央高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/03-颛顼三世帝焙央高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/04-颛顼四世帝上强高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/04-颛顼四世帝上强高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/04-颛顼四世帝上强高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/05-颛顼五世帝苟羿高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/05-颛顼五世帝苟羿高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/05-颛顼五世帝苟羿高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/06-颛顼六世帝住元高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/06-颛顼六世帝住元高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/06-颛顼六世帝住元高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/07-颛顼七世帝肖会高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/07-颛顼七世帝肖会高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/07-颛顼七世帝肖会高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/08-颛顼八世帝美勾高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/08-颛顼八世帝美勾高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/08-颛顼八世帝美勾高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/09-颛顼九世帝卜习高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/09-颛顼九世帝卜习高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/09-颛顼九世帝卜习高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/10-颛顼十世帝贵尤高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/10-颛顼十世帝贵尤高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/10-颛顼十世帝贵尤高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/11-颛顼十一世帝祥象高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/11-颛顼十一世帝祥象高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/11-颛顼十一世帝祥象高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/12-颛顼十二世帝佳琚高阳氏纪.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/12-颛顼十二世帝佳琚高阳氏纪.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/01-高陽氏/12-颛顼十二世帝佳琚高阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/03-高陽朝代/03-《史记》五帝本纪·颛顼.md": {
	id: "事册之载/12-疏仡纪/03-高陽朝代/03-《史记》五帝本纪·颛顼.md";
  slug: "事册之载/12-疏仡纪/03-高陽朝代/03-史记五帝本纪颛顼";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-喾天世本.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-喾天世本.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-喾天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/01-喾一世帝喾美高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/01-喾一世帝喾美高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/01-喾一世帝喾美高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/02-喾二世帝沙芙高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/02-喾二世帝沙芙高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/02-喾二世帝沙芙高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/03-喾三世帝刚歌高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/03-喾三世帝刚歌高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/03-喾三世帝刚歌高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/04-喾四世帝香莫高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/04-喾四世帝香莫高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/04-喾四世帝香莫高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/05-喾五世帝长昼高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/05-喾五世帝长昼高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/05-喾五世帝长昼高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/06-喾六世帝散高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/06-喾六世帝散高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/06-喾六世帝散高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/07-喾七世帝千龙高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/07-喾七世帝千龙高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/07-喾七世帝千龙高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/08-喾八世帝桑甘高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/08-喾八世帝桑甘高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/08-喾八世帝桑甘高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/09-喾九世帝没高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/09-喾九世帝没高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/09-喾九世帝没高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/10-喾十世帝杜里高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/10-喾十世帝杜里高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/10-喾十世帝杜里高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/11-喾十一世帝牡高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/11-喾十一世帝牡高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/11-喾十一世帝牡高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/12-喾十二世帝姗先高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/12-喾十二世帝姗先高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/12-喾十二世帝姗先高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/13-喾十三世帝森浸高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/13-喾十三世帝森浸高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/13-喾十三世帝森浸高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/14-喾十四世帝谣高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/14-喾十四世帝谣高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/14-喾十四世帝谣高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/15-喾十五世帝亲义高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/15-喾十五世帝亲义高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/15-喾十五世帝亲义高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/16-喾十六氏帝施高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/16-喾十六氏帝施高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/16-喾十六氏帝施高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/17-喾十七世帝森辈高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/17-喾十七世帝森辈高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/17-喾十七世帝森辈高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/18-喾十八世帝山回高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/18-喾十八世帝山回高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/18-喾十八世帝山回高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/19-喾十九世帝立库高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/19-喾十九世帝立库高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/19-喾十九世帝立库高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/20-喾二十世帝将肃高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/20-喾二十世帝将肃高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/20-喾二十世帝将肃高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/21-喾廿一世帝巴加高辛氏纪.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/21-喾廿一世帝巴加高辛氏纪.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/01-高辛氏/21-喾廿一世帝巴加高辛氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/04-高辛朝代/03-《史记》五帝本纪·帝喾.md": {
	id: "事册之载/12-疏仡纪/04-高辛朝代/03-《史记》五帝本纪·帝喾.md";
  slug: "事册之载/12-疏仡纪/04-高辛朝代/03-史记五帝本纪帝喾";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-挚天世本.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-挚天世本.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-挚天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/01-挚一世帝角青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/01-挚一世帝角青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/01-挚一世帝角青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/02-挚二世帝继青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/02-挚二世帝继青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/02-挚二世帝继青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/03-挚三世帝裘青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/03-挚三世帝裘青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/03-挚三世帝裘青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/04-挚四世帝呛青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/04-挚四世帝呛青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/04-挚四世帝呛青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/05-挚五世帝凯青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/05-挚五世帝凯青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/05-挚五世帝凯青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/06-挚六世帝咣哴云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/06-挚六世帝咣哴云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/06-挚六世帝咣哴云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/07-挚七世帝向妺云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/07-挚七世帝向妺云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/07-挚七世帝向妺云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/08-挚八世帝山叭云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/08-挚八世帝山叭云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/08-挚八世帝山叭云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/09-挚九世帝孤云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/09-挚九世帝孤云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/09-挚九世帝孤云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/10-挚十世帝沟次云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/10-挚十世帝沟次云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/10-挚十世帝沟次云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/11-挚十一世帝控卯云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/11-挚十一世帝控卯云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/11-挚十一世帝控卯云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/12-挚十二世帝川壻云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/12-挚十二世帝川壻云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/12-挚十二世帝川壻云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/13-挚十三世帝长幅云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/13-挚十三世帝长幅云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/13-挚十三世帝长幅云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/14-挚十四世帝美云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/14-挚十四世帝美云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/14-挚十四世帝美云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/15-挚十五世帝斯绩云阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/15-挚十五世帝斯绩云阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/15-挚十五世帝斯绩云阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/16-挚十六世帝斯遂青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/16-挚十六世帝斯遂青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/16-挚十六世帝斯遂青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/17-挚十七世帝鸷青阳氏纪.md": {
	id: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/17-挚十七世帝鸷青阳氏纪.md";
  slug: "事册之载/12-疏仡纪/05-青陽朝代/01-青陽氏/17-挚十七世帝鸷青阳氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-尧天世本.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-尧天世本.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-尧天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-尧一世帝尧陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-尧一世帝尧陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-尧一世帝尧陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-水正崇伯鲧氏/01-水正崇伯鲧氏列.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-水正崇伯鲧氏/01-水正崇伯鲧氏列.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/01-水正崇伯鲧氏/01-水正崇伯鲧氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/02-尧二世帝放勋陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/02-尧二世帝放勋陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/02-尧二世帝放勋陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/03-尧三世帝江陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/03-尧三世帝江陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/03-尧三世帝江陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/04-尧四世帝栔陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/04-尧四世帝栔陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/04-尧四世帝栔陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/05-尧五世帝裘陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/05-尧五世帝裘陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/05-尧五世帝裘陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/06-尧六世帝密陶唐氏纪.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/06-尧六世帝密陶唐氏纪.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/01-陶唐氏/06-尧六世帝密陶唐氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/06-陶唐朝代/03-《史记》五帝本纪·帝尧.md": {
	id: "事册之载/12-疏仡纪/06-陶唐朝代/03-《史记》五帝本纪·帝尧.md";
  slug: "事册之载/12-疏仡纪/06-陶唐朝代/03-史记五帝本纪帝尧";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-司徙商伯子氏/01-商伯一世契子氏传.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-司徙商伯子氏/01-商伯一世契子氏传.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-司徙商伯子氏/01-商伯一世契子氏传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-舜一世帝舜有虞氏纪.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-舜一世帝舜有虞氏纪.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/01-舜一世帝舜有虞氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/02-舜二世帝章有虞氏纪.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/02-舜二世帝章有虞氏纪.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/01-有虞氏/02-舜二世帝章有虞氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/01-舜天世本.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/01-舜天世本.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/01-舜天世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/02-夏后氏/01-大司空禹夏后氏列.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/02-夏后氏/01-大司空禹夏后氏列.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/02-夏后氏/01-大司空禹夏后氏列";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/07-有虞朝代/03-《史记》五帝本纪·帝舜.md": {
	id: "事册之载/12-疏仡纪/07-有虞朝代/03-《史记》五帝本纪·帝舜.md";
  slug: "事册之载/12-疏仡纪/07-有虞朝代/03-史记五帝本纪帝舜";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏世本.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏世本.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏世本";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/01-夏一世帝禹夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/01-夏一世帝禹夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/01-夏一世帝禹夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/02-夏二世王启夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/02-夏二世王启夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/02-夏二世王启夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/03-夏三世王太康夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/03-夏三世王太康夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/03-夏三世王太康夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/04-夏四世王仲康夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/04-夏四世王仲康夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/04-夏四世王仲康夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/05-夏五世王相夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/05-夏五世王相夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/01-夏后氏/05-夏五世王相夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/02-有穷氏/01-夏六世王羿有穷氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/02-有穷氏/01-夏六世王羿有穷氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/02-有穷氏/01-夏六世王羿有穷氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/03-《史记》夏本纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/03-《史记》夏本纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/03-史记夏本纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/03-寒氏/01-夏七世王寒浞寒氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/03-寒氏/01-夏七世王寒浞寒氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/03-寒氏/01-夏七世王寒浞寒氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/08-夏后朝代/04-夏后氏/01-夏八世王少康夏后氏纪.md": {
	id: "事册之载/12-疏仡纪/08-夏后朝代/04-夏后氏/01-夏八世王少康夏后氏纪.md";
  slug: "事册之载/12-疏仡纪/08-夏后朝代/04-夏后氏/01-夏八世王少康夏后氏纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/09-殷商朝代/03-《史记》殷本纪.md": {
	id: "事册之载/12-疏仡纪/09-殷商朝代/03-《史记》殷本纪.md";
  slug: "事册之载/12-疏仡纪/09-殷商朝代/03-史记殷本纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/10-西周朝代/03-《史记》周本纪-西周.md": {
	id: "事册之载/12-疏仡纪/10-西周朝代/03-《史记》周本纪-西周.md";
  slug: "事册之载/12-疏仡纪/10-西周朝代/03-史记周本纪-西周";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/10-西周朝代/穆天子传.md": {
	id: "事册之载/12-疏仡纪/10-西周朝代/穆天子传.md";
  slug: "事册之载/12-疏仡纪/10-西周朝代/穆天子传";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/12-疏仡纪/11-東周朝代/03-《史记》周本纪-东周.md": {
	id: "事册之载/12-疏仡纪/11-東周朝代/03-《史记》周本纪-东周.md";
  slug: "事册之载/12-疏仡纪/11-東周朝代/03-史记周本纪-东周";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/13-门阀纪/02-秦朝代/01-嬴秦氏/01-《史记》秦始皇本纪.md": {
	id: "事册之载/13-门阀纪/02-秦朝代/01-嬴秦氏/01-《史记》秦始皇本纪.md";
  slug: "事册之载/13-门阀纪/02-秦朝代/01-嬴秦氏/01-史记秦始皇本纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/13-门阀纪/02-秦朝代/03-《史记》秦本纪.md": {
	id: "事册之载/13-门阀纪/02-秦朝代/03-《史记》秦本纪.md";
  slug: "事册之载/13-门阀纪/02-秦朝代/03-史记秦本纪";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"事册之载/事册纲.md": {
	id: "事册之载/事册纲.md";
  slug: "事册之载/事册纲";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
"时序纲.md": {
	id: "时序纲.md";
  slug: "时序纲";
  body: string;
  collection: "演进轨迹";
  data: InferEntrySchema<"演进轨迹">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
