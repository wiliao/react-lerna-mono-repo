export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchData() {
  await delay(100);
  return { data: "hello" };
}
