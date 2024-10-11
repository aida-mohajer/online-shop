import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 5, checkperiod: 120 }); //10 min

export const cacheStats = {
  hitCount: 0,
  missCount: 0,
};
