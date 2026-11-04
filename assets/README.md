# Guia de imagens do portfólio

Enquanto um arquivo não existe, o site mostra uma moldura tracejada com o caminho esperado.
Coloque a imagem com o **nome exato** abaixo e ela aparece sozinha.

**Regra principal:** use só imagens reais (prints, fotos, telas). Mockup genérico e imagem
gerada por IA fazem o portfólio parecer template. Isso vale mais do que qualquer animação.

## Avatar 3D do hero — `models/`
| Arquivo | Uso |
|---|---|
| `gabriel.glb` | Seu avatar do Avaturn, sentado de costas programando (já está aqui). Para trocar a roupa ou o visual, exporte de novo no Avaturn e substitua este arquivo com o mesmo nome. |
| `typing.fbx` | Opcional. A animação "Typing" do Mixamo (FBX Binary, **Without Skin**, 30 FPS). Se existir, substitui a digitação feita por código. |

## Projetos
As imagens ficam nas pastas que você criou. Os caminhos estão no `index.html` (lista de projetos)
e em `js/projects.js` (capa e galeria de cada estudo de caso).

| Projeto | Pasta | Capa na lista |
|---|---|---|
| Profit | `images/siteProfit/` | `01_inicio.jpg` |
| PolarisAI (IC) | `images/projects/agente-requisitos/` | `ICinterface02.png` |
| Redes complexas | `images/projects/redes-complexas/` | `redes01.jpg` (você no pôster) |
| Workshop Git (CDI) | `images/workshopCDI/` | `WorkshopCDI03.jpeg` |
| Visita à TRACTIAN | `images/tractianPictures/` | `tractianPicture03.jpg` (sua foto de perfil) |

Para trocar o enquadramento de uma foto cortada, mude o `object-position` da imagem no
`index.html` e o `coverPosition` do projeto em `js/projects.js`.

> Ao publicar o site num servidor Linux, os nomes diferenciam maiúsculas de minúsculas:
> `WorkshopCDI03.jpeg` e `workshopCDI02.jpeg` precisam continuar escritos exatamente assim.

## Outros
| Arquivo | Uso |
|---|---|
| `images/logo/favicon.svg` | Ícone da aba (pode substituir) |
| `images/og/og-cover.png` | 1200×630, prévia quando o link é compartilhado |
| `docs/curriculo-gabriel-morais.pdf` | Links "CV" e "Currículo (PDF)" (já copiado) |
| `docs/apostila-git-github.pdf` | Download da apostila no workshop (copiada do portfólio antigo) |

## Textos para completar
Em `js/projects.js`, os campos `decisions`, `learned` e `evidence` estão vazios de propósito.
Só você sabe por que escolheu RAG, Leiden ou SvelteKit, o que deu errado e como validou.
Quando preenchidos, eles aparecem sozinhos no estudo de caso.
