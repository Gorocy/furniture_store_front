
export async function load({ params }){

    const response = await fetch(`http://localhost:8080/product/${params.id}`);

    const data = await response.json();

    return {data};
}