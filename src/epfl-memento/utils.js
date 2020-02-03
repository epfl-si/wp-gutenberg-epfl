const prod = false;
if (prod) {
  global.BASE_MEMENTO_API_REST_URL = "https://memento.epfl.ch/api/v1/";
} else {
  //global.BASE_MEMENTO_API_REST_URL = "https://staging-memento.epfl.ch/api/v1/";
  global.BASE_MEMENTO_API_REST_URL = "https://memento-test.epfl.ch/api/v1/";
}