const db = require('./connection');
const { User, Product, Category, Order } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');
  await cleanDB('Order', 'orders');


  const categories = await Category.insertMany([
    { name: 'Romance' },
    { name: 'Horror' },
    { name: 'Mystery' },
    { name: 'Poetry' },
    { name: 'Biography' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: 'Jane Eyre',
      author: ['Charlotte Bronte'],
      description:
        `Jane Eyre is a novel by the English writer Charlotte Brontë. It was published under her pen name "Currer Bell" on 19 October 1847 by Smith, Elder & Co. of London. The first American edition was published the following year by Harper & Brothers of New York.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/557/526/9780451526557.IN.0.m.jpg',
      category: categories[0]._id,
      price: 29.99,
      quantity: 100,
      tags: ['best-seller', 'classic', 'sale'],
      sale: true,
      dateAdded: '1697820525420',

    },
    {
      name: '1000 Black Umbrellas',
      author: ['Daniel McGinn'],
      description:
        '1000 Black Umbrellas description',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/436/796/1496796436.0.m.jpg',
      category: categories[3]._id,
      price: 13.99,
      quantity: 100,
      tag: ['best-seller'],
      sale: true,
      dateAdded: '1697820525429',
    },
    {
      name: 'Winchell',
      author: ['Neal Gabler'],
      category: categories[4]._id,
      description:
        'Winchell description',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/742/364/134364742.0.m.jpg',
      price: 15.99,
      quantity: 20,
      tags: ['sale'],
      dateAdded: '169782052542'
    },
    
    {
      name: 'The Last Skin',
      author: ['Barbara Ras'],
      category: categories[3]._id,
      description:
        'A third collection from a poet whose "beautiful sentences weave the miraculous and mundane into a single, luminous tapestry" (The Atlanta Journal-Constitution).',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/974/116/9780143116974.RH.0.l.jpg',
      price: 3.99,
      quantity: 50,
      tags: ['sale']
    },
    {
      name: "Blood's a Rover",
      author: ['James Ellroy'],
      category: categories[2]._id,
      description:
        '',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/492/201/315201492.0.m.jpg',
      price: 3.99,
      quantity: 50,
      tags: []
    },
    // categories need adjeusting below
    {
      name: "A Long Way Gone",
      author: ['Ishmael Beah'],
      category: categories[0]._id,
      description:
        '',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/518/252/1186252518.0.m.jpg',
      price: 15.99,
      quantity: 50,
      sale: true,
      dateAdded: '169784052542',
      tags: []
    },
    {
      name: "Personal History",
      author: ['Katharine Graham'],
      category: categories[4]._id,
      description:
        `Personal History is the autobiography of Katharine Graham. It was published in 1997 and won the Pulitzer Prize for Biography or Autobiography in 1998. The book received widespread critical acclaim for its candour in dealing with her husband's mental illness, and the challenges she faced in a male-dominated working environment.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/645/518/1183518645.0.m.jpg',
      price: 10.99,
      quantity: 20,
      dateAdded: '169782057542',
      tags: []
    },
    {
      name: "Poems, Poets, Poetry",
      author: ['Helen Vendler'],
      category: categories[3]._id,
      description:
        '',
      image: 'https://d3525k1ryd2155.cloudfront.net/h/680/488/1183488680.0.m.jpg',
      price: 24.99,
      quantity: 50,
      dateAdded: '169782051342',
      tags: []
    },
    {
      name: "A Valiant Ignorance (Vol. 1-3): Victorian Romance",
      author: [' Victorian Romance'],
      category: categories[0]._id,
      description:
        'William Romayne had been widely known and respected throughout Europe as a successful and distinguished financier. However, he turned out to be a swindler and a mastermind behind a banking fraud and when it was detected he committed suicide, leaving behind his wife and his son Julian.',
      image: 'https://d3525k1ryd2155.cloudfront.net/f/740/341/9788027341740.IN.0.m.jpg',
      price: 19.99,
      quantity: 150,
      sale: true,
      dateAdded: '169782032542',
      tags: [],
    },
    {
      name: "The HORROR on the BEACH : A Tale in the CTHULHU MYTHOS",
      author: ['Alan Dean Foster'],
      category: categories[0]._id,
      description:
        `"The Horror on the Beach" is a Cthulhu Mythos story written by prolific science fiction author Alan Dean Foster.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/295/014/450014295.0.l.jpg',
      price: 12.99,
      quantity: 80,
      dateAdded: '169782052242',
      tags: [],
    },
    {
      name: "Gone Girl",
      author: ['Gillian Flynn'],
      category: categories[2]._id,
      description:
        `Gone Girl is a 2012 crime thriller novel by American writer Gillian Flynn. It was published by Crown Publishing Group in June 2012. The novel was popular and made the New York Times Best Seller list. The sense of suspense in the novel comes from whether Nick Dunne is responsible for the disappearance of his wife Amy. `,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/364/588/9780307588364.RH.0.l.jpg',
      price: 13.99,
      quantity: 50,
      dateAdded: '169782042542',
      tags: [],
    },
    //
    {
      name: "Girl in Pieces",
      author: ['Kathleen Glasgow'],
      category: categories[2]._id,
      description:
        `A haunting, beautiful, and necessary book that will stay with you long after you've read the last page.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/545/785/1382785545.0.m.jpg',
      price: 6.99,
      quantity: 30,
      sale: true,
      dateAdded: '169482052542',
      tags: [],
    },
    {
      name: "How to Make Friends with the Dark",
      author: ['Kathleen Glasgow'],
      category: categories[2]._id,
      description:
        `From the New York Times bestselling author of Girl in Pieces comes a novel about love and loss and learning how to continue when it feels like you're surrounded by darkness.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/784/934/9781101934784.RH.0.m.jpg',
      price: 3.99,
      quantity: 60,
      dateAdded: '169742052542',
      tags: [],
    },
    // 13
    {
      name: "Love THeoretically",
      author: ['Ali Hazelwood'],
      category: categories[0]._id,
      description:
        `The many lives of theoretical physicist Elsie Hannaway have finally caught up with her. By day, she's an adjunct professor, toiling away at grading labs and teaching thermodynamics in the hopes of landing tenure.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/237/153/1573153237.0.m.jpg',
      price: 29.99,
      quantity: 100,
      tags: [],
      dateAdded: '169282052542',
    },
    {
      name: "Seven Days in June",
      author: ['Tia Williams'],
      category: categories[0]._id,
      description:
        `Seven Days in June takes a second chance love story and manages to capture within its pages an entire spectrum of Black spirit, joy, humor, and redemption.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/789/542/78542789.0.m.jpg',
      price: 10.99,
      quantity: 50,
      sale: true,
      dateAdded: '169782051542',
      tags: [],
    },
    {
      name: "The Murder Notebook",
      author: ['Jonathan Santlofer'],
      category: categories[2]._id,
      description:
        `An acclaimed visual artist whose numerous awards include two National Endowment for the Arts painting grants—and whose work has been reviewed in The New York Times, Art in America, and Artforum, among other publications—Santlofer combines gripping tales of murder and detection with stunning artwork that enhances and is integral to the story.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/142/292/1454292142.0.m.jpg',
      price: 5.99,
      quantity: 40,
      dateAdded: '169782052522',
      tags: []
    },
    {
      name: "The Great Gatsby",
      author: ['F Scott Fitzgerald'],
      category: categories[0]._id,
      description:
        `The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/328/367/1535367328.0.m.jpg',
      price: 12.99,
      quantity: 100,
      tags: [],
      dateAdded: '169782050542',
    },
    {
      name: "Haunting Adeline",
      author: ['H.D Carlton'],
      category: categories[1]._id,
      description:
        `The Diamond. Death walks alongside me but the reaper is no match for me. I'm trapped in a world full of monsters dressed as men, and those who aren't as they seem. They won't keep me forever. I no longer recognize the person I've become. And I'm fighting to find my way back to the beast who hunts me in the night.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/559/756/1520756559.0.m.jpg',
      price: 7.99,
      quantity: 50,
      sale: true,
      dateAdded: '169782032542',
      tags: []
    },
    {
      name: "House of Leaves",
      author: ['Mark Z. Danielewski'],
      category: categories[1]._id,
      description:
        `House of Leaves is the debut novel by American author Mark Z. Danielewski, published in March 2000 by Pantheon Books. A bestseller, it has been translated into a number of languages, and is followed by a companion piece, The Whalestoe Letters.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/768/703/9780375703768.RH.0.m.jpg',
      price: 9.99,
      quantity: 20,
      dateAdded: '169762052542',
      tags: []
    },
    {
      name: "Carrie",
      author: ['Stephen King'],
      category: categories[1]._id,
      description:
        `Carrie is a 1974 horror novel, the first by American author Stephen King. Set in Chamberlain, Maine, the plot revolves around Carrie White, a friendless, bullied high-school girl from an abusive religious household who discovers she has telekinetic powers.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/874/805/9780345805874.RH.0.m.jpg',
      price: 19.99,
      quantity: 80,
      tags: []
    },
    {
      name: "IT",
      author: ['Stephen King'],
      category: categories[1]._id,
      description:
        `It is a 1986 horror novel by American author Stephen King. It was his 22nd book and his 17th novel written under his own name. The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears of its victims to disguise itself while hunting its prey.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/258/726/1174726258.0.m.jpg',
      price: 20.99,
      quantity: 80,
      tags: []
    },
    {
      name: "The Journals of Sylvia Plath",
      author: ['Sylvia Plath'],
      category: categories[4]._id,
      description:
        `First U.S. Publication A major literary event--the complete, uncensored journals of Sylvia Plath, published in their entirety for the first time. Sylvia Plath's journals were originally published in 1982 in a heavily abridged version authorized by Plath's husband, Ted Hughes.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/f/918/493/9780385493918.RH.0.m.jpg',
      price: 19.99,
      quantity: 80,
      tags: []
    },
    {
      name: "No Longer Human",
      author: ['Osamu Dazai'],
      category: categories[4]._id,
      description:
        `No Longer Human, also translated as A Shameful Life, is a 1948 novel by Japanese author Osamu Dazai.`,
      image: 'https://d3525k1ryd2155.cloudfront.net/h/895/449/1330449895.0.m.jpg',
      price: 19.99,
      quantity: 80,
      tags: []
    },

  ]);

  console.log('products seeded');
  
  const orders = await Order.insertMany([
    {
      products: [products[0]._id, products[0]._id, products[1]._id],
      shipped: true,
    },
    {
      products: [products[0]._id],
      shipped: true,
    },
    {
      products: [products[2]._id, products[1]._id],
    }
  ])
  await User.create({
    firstName: 'John',
    lastName: 'Smith',
    email: 'jsmith@fake.com',
    password: 'password12345',
    orders: [orders[0]._id, orders[1]._id],

  });

  await User.create({
    firstName: 'riley',
    lastName: 'riley',
    email: 'riley@rileymail.com',
    password: 'riley',
    orders: [],
  });

  await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: 'adminpassword',
    admin: true
  });

  console.log('users seeded');

  process.exit();
});
