export async function onRequest({env}){
  const {results}=await env.DB.prepare('SELECT * FROM posts ORDER BY id DESC LIMIT 50').all();
  return new Response(JSON.stringify({posts:results}),{headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}
