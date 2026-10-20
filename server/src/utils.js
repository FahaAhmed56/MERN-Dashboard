export const formatStatus=status=>status.split('_').map(s=>s[0].toUpperCase()+s.slice(1)).join(' ');
export const counts=tasks=>tasks.reduce((acc,t)=>({...acc,[t.status]:(acc[t.status]||0)+1}),{todo:0,in_progress:0,done:0});
