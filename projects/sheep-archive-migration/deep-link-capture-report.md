# Sheep Archive Deep Link Capture Report

This pass captures deeper internal Notion pages referenced by previously captured raw pages. It follows the raw-only migration boundary: no distilled ZHPMind wiki pages were modified.

## Summary

- Existing captured page ids before this pass: 243
- Internal Notion page ids discovered in raw corpus: 254
- Unresolved before this pass: 14
- Captured this pass: 0
- Errors this pass: 14
- Raw output directory: `wiki/raw/sheep-archive-public/deep-links/`
- Raw manifest: `wiki/raw/sheep-archive-public/deep-link-capture-manifest.json`

## Highest-Link Source Files

- `people-pages/08-维多利亚时代的程序员.md`: 3
- `subpages/14-inventing-on-principle-演讲的观后感.md`: 2
- `people-pages/06-史蒂夫-乔布斯.md`: 1
- `people-pages/07-王慧文.md`: 1
- `people-pages/16-alan-turing.md`: 1
- `people-pages/30-doug-engelbart.md`: 1
- `people-pages/56-nat-friedman.md`: 1
- `people-pages/65-shahil-lavingia.md`: 1
- `people-pages/69-tim-burners-lee.md`: 1
- `subpages/02-唤起谁心中的向往感.md`: 1
- `subpages/19-ivan-zhao-论-ai.md`: 1

## Errors

- `02bd9e30-06fc-4da0-8d07-4f352d1eaae5` https://pmthinking.notion.site/02bd9e3006fc4da08d074f352d1eaae5?pvs=24#02bd9e3006fc4da08d074f352d1eaae5: SSLError(MaxRetryError("HTTPSConnectionPool(host='www.notion.so', port=443): Max retries exceeded with url: /api/v3/loadPageChunk (Caused by SSLError(SSLEOFError(8, '[SSL: UNEXPECTED_EOF_WHILE_READING] EOF occurred in violation of protocol (_ssl.c:1016)')))"))
- `0e28ac34-35e7-4a37-a251-f543d4440f6a` https://pmthinking.notion.site/0e28ac3435e74a37a251f543d4440f6a#efdfaccbe2cb41b98dce1300ff8cce10: ValueError('root block missing')
- `14a5e760-01bf-44bf-b3c0-b6dc5270f0ba` https://pmthinking.notion.site/14a5e76001bf44bfb3c0b6dc5270f0ba?pvs=24#14a5e76001bf44bfb3c0b6dc5270f0ba: ValueError('root block missing')
- `1b842fcf-b599-4e5b-aeea-5441c14ff5ef` https://pmthinking.notion.site/1b842fcfb5994e5baeea5441c14ff5ef?pvs=24#1b842fcfb5994e5baeea5441c14ff5ef: ValueError('root block missing')
- `52612b49-cf79-4456-afa1-15864c19046d` https://pmthinking.notion.site/52612b49cf794456afa115864c19046d?pvs=24#52612b49cf794456afa115864c19046d: ValueError('root block missing')
- `52da7f3f-f746-459c-aaca-524b5ad912d9` https://pmthinking.notion.site/52da7f3ff746459caaca524b5ad912d9?pvs=25: ValueError('root block missing')
- `714e2ecb-1280-4f2d-855d-3adf39e7f7f5` https://pmthinking.notion.site/714e2ecb12804f2d855d3adf39e7f7f5?pvs=24#714e2ecb12804f2d855d3adf39e7f7f5: ValueError('root block missing')
- `7263b565-d7b7-4530-9572-0fa3d4c3dcdf` https://pmthinking.notion.site/7263b565d7b7453095720fa3d4c3dcdf?pvs=24#7263b565d7b7453095720fa3d4c3dcdf: ValueError('root block missing')
- `afa2acd2-655a-4018-9d5d-b43fe08ba33f` https://pmthinking.notion.site/afa2acd2655a40189d5db43fe08ba33f?pvs=24#afa2acd2655a40189d5db43fe08ba33f: ValueError('root block missing')
- `bb367c59-4aa6-4c8b-9fda-1f69ea3464fb` https://pmthinking.notion.site/bb367c594aa64c8b9fda1f69ea3464fb?pvs=24#bb367c594aa64c8b9fda1f69ea3464fb: ValueError('root block missing')
- `bd019293-d3ea-423c-a90f-fcfe285a51c3` https://pmthinking.notion.site/bd019293d3ea423ca90ffcfe285a51c3#2386dc00f7e94f8cabb22d6517d93c22: ValueError('root block missing')
- `cd779a0c-fe93-47f0-9312-de1cb4db486d` https://pmthinking.notion.site/cd779a0cfe9347f09312de1cb4db486d?pvs=25: ValueError('root block missing')
- `ecd14a51-de41-446f-910d-fa8ad52da4a5` https://pmthinking.notion.site/ecd14a51de41446f910dfa8ad52da4a5?pvs=24#ecd14a51de41446f910dfa8ad52da4a5: ValueError('root block missing')
- `ef02f283-7e94-4778-ba0b-f207fa70d89e` https://pmthinking.notion.site/ef02f2837e944778ba0bf207fa70d89e?pvs=25: ValueError('root block missing')

## Next Check

Run another internal-link audit after this pass. These deep pages may themselves reveal more internal Notion links.
