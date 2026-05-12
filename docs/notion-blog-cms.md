# Blog con Notion CMS

La página `/blog/` puede leer publicaciones desde una base de datos de Notion durante el despliegue de GitHub Pages.

## Base de datos en Notion

Crea una base de datos llamada `Blog Hijos del Océano` con estas propiedades:

| Propiedad | Tipo recomendado | Uso |
| --- | --- | --- |
| `Título` | Title | Título visible de la publicación |
| `Slug` | Text | URL limpia opcional |
| `Estado` | Select | Usar `Borrador`, `Pendiente`, `Publicado` |
| `Autor` | Text | Autor visible |
| `Categoría` | Select | Pesca ilegal, Plástico, Conciencia, Testimonio, Acción |
| `Resumen` | Text | Bajada corta de la nota |
| `Fecha` | Date | Fecha de publicación |
| `Imagen` | URL o Files | Imagen principal |
| `Tipo` | Select | Usar `marca` o `tribu` |

Solo aparecen en la web las filas con `Estado = Publicado`.

## Contenido

El cuerpo de la página de Notion se usa como contenido largo de la nota. En esta primera versión se muestra la tarjeta y el resumen; el contenido queda sincronizado en `data/blog-posts.json` para futuras páginas individuales.

## Integración de Notion

1. Crea una integración en Notion: <https://www.notion.so/my-integrations>
2. Copia el `Internal Integration Secret`.
3. En la base de datos de Notion, usa `Share` y agrega la integración.
4. Copia el ID de la base de datos desde la URL de Notion.

## Secretos en GitHub

En el repositorio:

`Settings > Secrets and variables > Actions > New repository secret`

Agrega:

- `NOTION_TOKEN`: el secret de la integración de Notion.
- `NOTION_DATABASE_ID`: el ID de la base de datos.

## Despliegue automático

GitHub Actions intenta sincronizar Notion antes de cada build y también corre cada 30 minutos.

Si Notion no está configurado, el sitio usa `data/blog-posts.json` como contenido inicial y no se rompe.

## Publicar una nota

1. Crea una fila nueva en Notion.
2. Completa título, resumen, categoría, tipo e imagen.
3. Escribe el contenido dentro de la página.
4. Cambia `Estado` a `Publicado`.
5. Espera el próximo despliegue automático o ejecuta manualmente el workflow `Deploy to GitHub Pages`.
