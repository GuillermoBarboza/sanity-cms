import { createClient } from "next-sanity";

export default function IndexPage({ categories }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>categories??</h2>
        {categories.length > 0 && (
          <ul>
            {categories.map((category) => (
              <li key={category._id}>{category?.name}</li>
            ))}
          </ul>
        )}
        {!categories.length > 0 && <p>No categories to show</p>}
        {categories.length > 0 && (
          <div>
            <pre>{JSON.stringify(categories, null, 2)}</pre>
          </div>
        )}
        {!categories.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

const client = createClient({
  projectId: "osmwx6ri",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: false
});

export async function getStaticProps() {
  const categories = await client.fetch(`*[_type == "category"]`);

  return {
    props: {
      categories
    }
  };
}
