"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
var config = {
    siteMetadata: {
        // You can overwrite values here that are used for the SEO component
        // You can also add new values here to query them like usual
        // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-minimal-blog/gatsby-config.mjs
        siteTitle: "Yagna",
        siteTitleAlt: "Yagna Patel",
        siteHeadline: "Yagna Patel Portfolio",
        siteUrl: "https://yagna.site/",
        siteDescription: "A digital garden of sorts",
        siteImage: "static\banner.jpg",
        siteLanguage: "en",
        author: "@Yagna",
    },
    trailingSlash: "never",
    plugins: [
        {
            resolve: "gatsby-plugin-netlify",
            // See the theme's README for all available options
            options: {
                navigation: [
                    {
                        title: "Blog",
                        slug: "/blog",
                    },
                    {
                        title: "link",
                        slug: "/link",
                    },
                ],
                externalLinks: [
                    {
                        name: "Twitter",
                        url: "https://twitter.com/dadbodshuffl",
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-sitemap",
            options: {
                output: "/",
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "minimal-blog - @lekoarts/gatsby-theme-minimal-blog",
                short_name: "minimal-blog",
                description: "Typography driven, feature-rich blogging theme with minimal aesthetics. Includes tags/categories support and extensive features for code blocks such as live preview, line numbers, and code highlighting.",
                start_url: "/",
                background_color: "#fff",
                // This will impact how browsers show your PWA/website
                // https://css-tricks.com/meta-theme-color-and-trickery/
                // theme_color: `#6B46C1`,
                display: "standalone",
                icons: [
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: "\n          {\n            site {\n              siteMetadata {\n                title: siteTitle\n                description: siteDescription\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ",
                feeds: [
                    {
                        serialize: function (_a) {
                            var _b = _a.query, site = _b.site, allPost = _b.allPost;
                            return allPost.nodes.map(function (post) {
                                var url = site.siteMetadata.siteUrl + post.slug;
                                var content = "<p>".concat(post.excerpt, "</p><div style=\"margin-top: 50px; font-style: italic;\"><strong><a href=\"").concat(url, "\">Keep reading</a>.</strong></div><br /> <br />");
                                return {
                                    title: post.title,
                                    date: post.date,
                                    excerpt: post.excerpt,
                                    url: url,
                                    guid: url,
                                    custom_elements: [{ "content:encoded": content }],
                                };
                            });
                        },
                        query: "{\n  allPost(sort: {date: DESC}) {\n    nodes {\n      title\n      date(formatString: \"MMMM D, YYYY\")\n      excerpt\n      slug\n    }\n  }\n}",
                        output: "rss.xml",
                        title: "Minimal Blog - @lekoarts/gatsby-theme-minimal-blog",
                    },
                ],
            },
        },
        // You can remove this plugin if you don't need it
        shouldAnalyseBundle && {
            resolve: "gatsby-plugin-webpack-statoscope",
            options: {
                saveReportTo: "".concat(__dirname, "/public/.statoscope/_bundle.html"),
                saveStatsTo: "".concat(__dirname, "/public/.statoscope/_stats.json"),
                open: false,
            },
        },
    ].filter(Boolean),
};
exports.default = config;
