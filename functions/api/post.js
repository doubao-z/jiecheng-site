export async function onRequest({request,env}){
  const url=new URL(request.url);
  const id=url.searchParams.get('id');
  if(!id)return new Response('missing id',{status:400});
  const post=await env.DB.prepare('SELECT * FROM posts WHERE id=?').bind(id).first();
  if(!post)return new Response('not found',{status:404});
  const replies=await env.DB.prepare('SELECT * FROM replies WHERE post_id=? ORDER BY id ASC').bind(id).all();
  return new Response(JSON.stringify({post,replies:replies.results}),{headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});
}
