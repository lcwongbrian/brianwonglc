const apiPrefix = process.env.NEXT_PUBLIC_SURFACE_API_URL;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchSurfaceById = async (id) => {
    const res = await fetch(`${apiPrefix}/hlist/getSurfaceById/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    });
    const data = await res.json();    
    return res.status === 200 ? data : null;
};

export async function getSurfaceById(id) {
    let count = 0;
    const retryCount = 5;
    try {
        return await fetchSurfaceById(id);
    } catch(err) {
        while (count < retryCount) {
            console.log(`Retry ${count + 1} time.`);
            await sleep(5000);
            try {
                return await fetchSurfaceById(id);
            } catch (err) {
                count++;
            }
        }         
    }
}