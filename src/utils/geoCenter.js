export default function geoCenter(geolocations) {
  if (!Array.isArray(geolocations)) {
    return [0, 0];
  }
  const { sin, cos, atan2, sqrt } = Math;
  const len = geolocations.length;
  let x = 0;
  let y = 0;
  let z = 0;

  geolocations.forEach((element) => {
    const { lat, lon } = element;
    x += cos(lat) * cos(lon);
    y += cos(lat) * sin(lon);
    z += sin(lat);
  });
  console.log({ x, y, z });

  x = x / len;
  y = y / len;
  z = z / len;

  console.log({ x, y, z });
  console.log([atan2(y, x), atan2(z, sqrt(x * x + y * y))]);
  return [atan2(y, x), atan2(z, sqrt(x * x + y * y))];
}
