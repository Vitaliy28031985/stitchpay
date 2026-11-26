
import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing.");
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet, headers) {
          // Оновлюємо cookies поточного request
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Створюємо нову response
          supabaseResponse = NextResponse.next({
            request,
          });

          // Записуємо оновлені cookies у response
          cookiesToSet.forEach(
            ({ name, value, options }) => {
              supabaseResponse.cookies.set(
                name,
                value,
                options
              );
            }
          );

          // Передаємо заголовки Supabase
          Object.entries(headers).forEach(([key, value]) => {
            supabaseResponse.headers.set(key, value);
          });
        },
      },
    }
  );

  // Перевіряємо справжність JWT користувача
  const { data, error } = await supabase.auth.getClaims();

  const isAuthenticated =
    !error && Boolean(data?.claims?.sub);

  // Якщо користувач не авторизований
  if (!isAuthenticated) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/login";

    loginUrl.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    const redirectResponse = NextResponse.redirect(loginUrl);

    // Не втрачаємо cookies, які оновив Supabase
    supabaseResponse.cookies.getAll().forEach(
      ({ name, value, ...options }) => {
        redirectResponse.cookies.set(
          name,
          value,
          options
        );
      }
    );

    // Переносимо важливі заголовки
    for (const header of [
      "cache-control",
      "expires",
      "pragma",
    ]) {
      const value = supabaseResponse.headers.get(header);

      if (value) {
        redirectResponse.headers.set(header, value);
      }
    }

    return redirectResponse;
  }

  return supabaseResponse;
}
// Вказуємо, які сторінки потрібно захищати
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/work/:path*",
    "/operations/:path*",
    "/payments/:path*",
    "/settings/:path*",
  ],
};
