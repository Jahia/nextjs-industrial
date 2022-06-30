import {getClient, getPageInfo} from '@jahia/nextjs-sdk';
import cms from '../../jahia';

const getHTMLError = ({message, path, locale}) => `
    <div jahiatype="mainmodule"
         path=${path}
         locale=${locale}
         template=""
         templateName="home"
         nodetypes="nt:base jmix:navMenuItem">
        <h2>${message}</h2>
    </div>`;

export default async function handler(req, res) {
    const defaultLocale = 'en';
    let cmsContext;

    if (!req.cookies?.__jContent_preview_ctx) {
        console.error('[API Preview] cookie not set');
        return;
    }

    try {
        cmsContext = JSON.parse(req.cookies.__jContent_preview_ctx);
    } catch (e) {
        console.error('[API Preview] cmsContext json parse error : ', e);
        return;
    }

    const locale = cmsContext.locale || defaultLocale;

    // Console.log('[API Preview] req: ',req)
    // console.log('[API Preview] req.cookies.__jContent_preview_ctx: ', req.cookies?.__jContent_preview_ctx)
    // console.log('[API Preview] req.query.path: ',req.query?.path)
    // console.log('[API Preview] process.env.NEXT_PREVIEW_SECRET: ',process.env.NEXT_PREVIEW_SECRET)

    const path = req.query?.path;

    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.NEXT_PREVIEW_SECRET) {
        res.setHeader('content-type', 'text/html');
        return res.status(400).end(getHTMLError({
            path,
            locale,
            message: 'Oups! Invalid token, please configure the NEXT PREVIEW SECRET at Site level',
        }));
    }

    const client = getClient();
    const {error, data} = await getPageInfo(client, path, 'EDIT');

    // If the slug doesn't exist prevent preview mode from being enabled
    if (error || !data.jcr.nodeByPath) {
        res.setHeader('content-type', 'text/html');
        return res.status(400).end(getHTMLError({
            path,
            locale,
            message: 'Oups! Invalid path',
        }));
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        // IsEdit:req.query.edit === "true" ? true : false
    }, {
        // MaxAge: 30, // The preview mode cookies expire in 30 s
    });

    let redirect = `${cms.paths.preview}/${locale}${data.jcr.nodeByPath.path}.html`;
    if (cmsContext.edit) {
        redirect = `${cms.paths.edit}/${locale}${data.jcr.nodeByPath.path}.html?redirect=${req.query?.redirect}`;
    }

    console.log('[API Preview] redirect to : ', redirect);
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(redirect);
}
