import type { APIRoute } from "astro";
import rss from '@astrojs/rss';
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ params, request, site }) => {
    const blogPosts = await getCollection('blog');
    return rss({
        // stylesheet: '/styles/rss.xsl',
        // `<title>` campo en el xml generado
        title: 'Blog de Pablo',
        // `<description>` campo en el xml generado
        description: 'Un simple blog de Pablo',
        // Usa el "site" desde el contexto del endpoint
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: site ?? '',
        // Array de `<item>`s en el xml generado
        // Consulta la sección "Generando `items`" para ejemplos utilizando colecciones de contenido y glob imports
        items: blogPosts.map(post =>({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: `/posts/${post.slug}`,
        })),
        // (opcional) inyecta xml personalizado
        customData: `<language>es-es</language>`,
      });
};
