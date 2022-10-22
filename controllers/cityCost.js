// mod.cjs
import express from 'express'
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import _ from "lodash"
import cheerio from "cheerio";

export class cityLivingCost {
    static getCityLivingCost = async (req, res) => {
        const {city} =req.params;
        const { currency = 'USD' } = req.query;

        const response = await fetch(`https://www.numbeo.com/cost-of-living/in/${city}?displayCurrency=${currency}`,
        );
        if (!response.ok) {
        return res.status(response.status).send(response.statusText);
        }
        const html = await response.text();
        console.log(html)
        const $ = cheerio.load(html);
        const rows = $('body > div.innerWidth > table > tbody > tr')
            .filter((i, el) => $(el).children('td').length === 3)
            .map((i, el) =>$(el)
            .children()
            .map((i, el) => $(el).text().trim())
            .toArray(),
            )
            .toArray();
        const costs = _.chunk(rows, 3).map(([item, costWithSymbol, range]) => {
        const cost = costWithSymbol.replace(/^.*?([\d,.]+).*?$/, '$1');
        const [rangeLow, rangeHigh] = range.split('-');
            return {
            item,
            cost,
            range: {
            low: rangeLow,
            high: rangeHigh,
            },
            };
        });
        return res.json({ city, currency, costs });
    };
}
