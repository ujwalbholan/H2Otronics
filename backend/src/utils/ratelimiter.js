import Redish from "ioredis";

const redish = new Redish();

const ratelimiter = async (req, res, next) => {
  const key = req.ip;
  const limit = 5;
  const window = 60;

  const counter = await redish.incr(key);

  if (counter === "1") {
    await redish.expire(key, window);
  }

  if (counter > limit) {
    return res.status(429).json({ message: "Too many request" });
  }

  next();
};

export default { ratelimiter };
