function updateDynamicCache (dynamicCache, req, res) {
  if (res.ok) {
    return caches.open(dynamicCache)
      .then(cache => {
        cache.put(req, res.clone())
        return res.clone()
      })
  }
  return res
}