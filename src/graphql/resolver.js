import queries from "./resolvers/query.js";
import mutations from "./resolvers/mutation.js";

const resolver = {
  ...mutations,
  ...queries,
};

export default resolver;
