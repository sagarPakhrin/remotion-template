## !!steps PageLayout

!duration 420

```jsx ! src/app/bookmarks/page.tsx
import { DefaultLayout } from "@/layouts/page.layout";

const title = "...";
const description = "...";

const og = {
  title,
  description,
};

export const metadata = {
  title,
  description,
  openGraph: og,
  twitter: og,
};

const Bookmarks = async () => {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </DefaultLayout>
  );
};

export default Bookmarks;
```

## !!steps ServerAction

!duration 480

```jsx ! src/actions/bookmarks.ts
"use server";

import { db } from "@/db";

type BookmarksQuery = {
  pageSize?: number;
};

export const getBookmarks = async ({
  pageSize = 5,
}: BookmarksQuery = {}) => {
  "use server";
  try {
    const data = await db.query.bookmarks.findMany({
      limit: pageSize,
    });

    const response = {
      data: data,
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps New

!duration 420

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        <div
          key={idx}
          className="..."
        >
          <Link
            href={bookmark.link}
            target="_blank"
            rel="noopener noreferrer"
            className="..."
          >
            <h2 className="...">{bookmark.name}</h2>
            <div className="...">
              <IoIosLink className="..." />
              <span className="...">
                {bookmark.link}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
```

## !!steps PageLayout Before

!duration 100
!skipEnterAnimation true

```jsx ! src/app/bookmarks/page.tsx
import { DefaultLayout } from "@/layouts/page.layout";

const title = "...";
const description = "...";

const Bookmarks = async () => {
  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </DefaultLayout>
  );
};

export default Bookmarks;
```

## !!steps Bookmarks Page

!duration 700

```jsx ! src/app/bookmarks/page.tsx
import { DefaultLayout } from "@/layouts/page.layout";
// !mark(1,2) 90
import { getBookmarks } from "@/actions/bookmarks";
import { BookmarkList } from "@/components/bookmarks/list";

const title = "...";
const description = "...";

const Bookmarks = async () => {
  // !mark 250
  const data = await getBookmarks();

  return (
    <DefaultLayout>
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500">{description}</p>
      {/* !mark(1:3) 450 */}
      <div className="mt-3">
        <BookmarkList bookmarks={data} />
      </div>
    </DefaultLayout>
  );
};

export default Bookmarks;
```

## !!steps List component

!duration 100
!skipEnterAnimation true

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        <div
          key={idx}
          className="..."
        >
          <Link
            href={bookmark.link}
            target="_blank"
            rel="noopener noreferrer"
            className="..."
          >
            <h2 className="...">{bookmark.name}</h2>
            <div className="...">
              <IoIosLink className="..." />
              <span className="...">
                {bookmark.link}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
```

## !!steps Wrap List Component import in InView

!duration 200

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
// !mark 30
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        <div
          key={idx}
          className="..."
        >
          <Link
            href={bookmark.link}
            target="_blank"
            rel="noopener noreferrer"
            className="..."
          >
            <h2 className="...">{bookmark.name}</h2>
            <div className="...">
              <IoIosLink className="..." />
              <span className="...">
                {bookmark.link}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
```

## !!steps Wrap List Component Wrap in InView

!duration 60

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
    </>
  );
};
```

## !!steps Wrap List Component Wrap in InView

!duration 900

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      {/* !mark(1:13) 20 */}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log("in view");
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps ServerAction Before Cursor

!duration 80
!skipEnterAnimation true

```jsx ! src/actions/bookmarks.ts
"use server";

import { db } from "@/db";

type BookmarksQuery = {
  pageSize?: number;
};

export const getBookmarks = async ({
  pageSize = 5,
}: BookmarksQuery = {}) => {
  "use server";
  try {
    const data = await db.query.bookmarks.findMany({
      limit: pageSize,
    });

    const response = {
      data: data,
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps ServerAction Cursor Prop

!duration 200

```jsx ! src/actions/bookmarks.ts
"use server";

import { db } from "@/db";

type BookmarksQuery = {
  pageSize?: number;
  // !mark(1) 40
  cursor?: number;
};

export const getBookmarks = async ({
  pageSize = 5,
  // !mark 40
  cursor,
}: BookmarksQuery = {}) => {
  "use server";
  try {
    const data = await db.query.bookmarks.findMany({
      limit: pageSize,
    });

    const response = {
      data: data,
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps ServerAction Where Clause

!duration 400

```jsx ! src/actions/bookmarks.ts
"use server";

import { db } from "@/db";

type BookmarksQuery = {
  pageSize?: number;
  cursor?: number;
};

export const getBookmarks = async ({
  pageSize = 5,
  cursor,
}: BookmarksQuery = {}) => {
  "use server";
  try {
    const data = await db.query.bookmarks.findMany({
      limit: pageSize,
      // !mark(1:2) 40
      where: (bookmarks, { gt }) =>
        cursor ? gt(bookmarks.id, cursor) : undefined,
    });

    const response = {
      data: data,
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps ServerAction Total and Cursor

!duration 600

```jsx ! src/actions/bookmarks.ts
export const getBookmarks = async ({
  pageSize = 5,
  cursor,
}: BookmarksQuery = {}) => {
  "use server";
  try {
    const data = await db.query.bookmarks.findMany({
      limit: pageSize,
      where: (bookmarks, { gt }) =>
        cursor ? gt(bookmarks.id, cursor) : undefined,
    });

    // !mark(1,2) 40
    const total = await db.select({ count: count() })
                          .from(bookmarks);

    // !mark 220
    const hasMoreData = data.length === pageSize;

    // !mark(1:3) 400
    const nextCursor = hasMoreData ?
                        data[data.length - 1]?.id
                        : undefined;

    const response = {
      data: data,
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps ServerAction Response

!duration 350

```jsx ! src/actions/bookmarks.ts


    const total = await db.select({ count: count() })
                          .from(bookmarks);

    const hasMoreData = data.length === pageSize;

    const nextCursor = hasMoreData ?
                        data[data.length - 1]?.id
                        : undefined;

    // !mark(1:7) 40
    const response = {
      data: data,
      metadata: {
        total: total?.[0]?.count || 0,
        cursor: nextCursor,
      },
    };

    return response;
  } catch (error: unknown) {
    throw new Error(`An error occurred: ${error}`);
  }
};
```

## !!steps Wrap List Component Before Cursor

!duration 80
!skipEnterAnimation true

```jsx ! src/components/bookmarks/list.tsx
"use client";
import { getBookmarks } from "@/actions/bookmarks";
import { InView } from "react-intersection-observer";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log("in view");
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps Wrap List Component With InitialData

!duration 200

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  // !mark 40
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log("in view");
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps Wrap List Component With InitialData in State

!duration 200

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {
  // !mark 40
  const [bookmarks, setBookmarks] = useState(initialData);

  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log("in view");
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps fetchMore

!duration 500

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {
  const [bookmarks, setBookmarks] = useState(initialData);

  // !mark(1:9) 40
  const getMore = async () => {
    const newBookmarks = await getBookmarks({
      cursor: bookmarks.metadata.cursor,
    });
    setBookmarks({
      data: [...bookmarks.data, ...newBookmarks.data],
      metadata: newBookmarks.metadata,
    });
  };


  const { data } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      <InView
        onChange={(inView) => {
          if (inView) {
            console.log("in view");
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps fetchMore on change

!duration 300

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {
  const [bookmarks, setBookmarks] = useState(initialData);

  const getMore = async () => {
    const newBookmarks = await getBookmarks({
      cursor: bookmarks.metadata.cursor,
    });
    setBookmarks({
      data: [...bookmarks.data, ...newBookmarks.data],
      metadata: newBookmarks.metadata,
    });
  };


  // !mark[16:24] 40
  const { data, metadata } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      <InView
        onChange={(inView) => {
          // !mark(1:3) 40
          if (inView && metadata.cursor) {
            getMore();
          }
        }}
        triggerOnce={false}
        threshold={0}
      >
        <div className="mt-4 flex justify-center">
          Loading more bookmarks...
        </div>
      </InView>
    </>
  );
};
```

## !!steps final frame

!duration 300

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {
  const [bookmarks, setBookmarks] = useState(initialData);

  const getMore = async () => {
    const newBookmarks = await getBookmarks({
      cursor: bookmarks.metadata.cursor,
    });
    setBookmarks({
      data: [...bookmarks.data, ...newBookmarks.data],
      metadata: newBookmarks.metadata,
    });
  };


  const { data, metadata } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      {/* !mark 20 */}
      {metadata.cursor && (
        <InView
          onChange={(inView) => {
            if (inView && metadata.cursor) {
              getMore();
            }
          }}
          triggerOnce={false}
          threshold={0}
        >
          <div className="mt-4 flex justify-center">
            Loading more bookmarks...
          </div>
        </InView>
      {/* !mark 20 */}
      )}
    </>
  );
};
```

## !!steps final frame

!duration 300

```jsx ! src/components/bookmarks/list.tsx

export const BookmarkList = ({
  bookmarks: initialData,
}: {
  bookmarks: Awaited<ReturnType<typeof getBookmarks>>;
}) => {
  const [bookmarks, setBookmarks] = useState(initialData);

  const getMore = async () => {
    const newBookmarks = await getBookmarks({
      cursor: bookmarks.metadata.cursor,
    });
    setBookmarks({
      data: [...bookmarks.data, ...newBookmarks.data],
      metadata: newBookmarks.metadata,
    });
  };


  const { data, metadata } = bookmarks;

  return (
    <>
      {data.map((bookmark, idx) => (
        ...
      ))}
      {metadata.cursor && (
        <InView
          onChange={(inView) => {
            if (inView && metadata.cursor) {
              getMore();
            }
          }}
          triggerOnce={false}
          threshold={0}
        >
          <div className="mt-4 flex justify-center">
            Loading more bookmarks...
          </div>
        </InView>
      )}
    </>
  );
};
```
