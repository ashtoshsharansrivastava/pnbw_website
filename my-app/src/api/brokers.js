let brokers = [
    { id: 1, name: 'Ethan Harper', phone: '555‑123‑4567', referrals: 15, profit: 180000, status: 'active', sites: 10, code: 'PNBW‑12345' },
    // ...more seed rows
  ];
  export const all = async () => brokers;
  export const addReferral = (code) => {
    const b = brokers.find(x => x.code === code);
    if (b) b.referrals += 1;
  };
  export const queue = [];
  export const approve = (id) => {
    const idx = queue.findIndex(x => x.id === id);
    if (idx > -1) {
      const [b] = queue.splice(idx, 1);
      b.status = 'active';
      b.code = `PNBW-${Math.floor(10000 + Math.random()*90000)}`;
      brokers.push(b);
    }
  };