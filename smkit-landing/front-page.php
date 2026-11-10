<?php
/**
 * Template Name: SMK IT Landing Page
 * Description: Halaman depan landing page React (Vite build).
 *
 * Cara pakai (ringkas):
 * 1. Jalankan `npm run build` (opsional: set VITE_WP_API_BASE kosong untuk mode inject).
 * 2. Salin isi folder `dist/` ke dalam tema aktif, mis. `wp-content/themes/<tema>/landing/`.
 * 3. Letakkan file ini sebagai `front-page.php` di tema yang sama (atau pilih template ini pada sebuah Page).
 * 4. Sesuaikan $landing_dir / $landing_uri jika lokasi folder `landing/` berbeda.
 */

$landing_dir = get_stylesheet_directory() . '/landing';
$landing_uri = get_stylesheet_directory_uri() . '/landing';
$manifest    = $landing_dir . '/.vite/manifest.json';

$entry = null;
if (file_exists($manifest)) {
    $decoded = json_decode(file_get_contents($manifest), true);
    if (is_array($decoded)) {
        // Vite 5+: entry biasanya "index.html"; beberapa setup memakai "src/main.tsx".
        if (isset($decoded['index.html'])) {
            $entry = $decoded['index.html'];
        } elseif (isset($decoded['src/main.tsx'])) {
            $entry = $decoded['src/main.tsx'];
        }
    }
}

// Ambil 3 berita terbaru untuk disuntikkan ke landing (tanpa REST/CORS).
$posts_query = new WP_Query([
    'post_type'      => 'post',
    'post_status'    => 'publish',
    'posts_per_page' => 3,
]);

$berita = [];
if ($posts_query->have_posts()) {
    while ($posts_query->have_posts()) {
        $posts_query->the_post();
        $post_id   = get_the_ID();
        $cats      = get_the_category($post_id);
        $cat_name  = !empty($cats) ? $cats[0]->name : 'Berita';
        $thumb_url = get_the_post_thumbnail_url($post_id, 'large');
        if (!$thumb_url) {
            $thumb_url = '';
        }

        $berita[] = [
            'id'       => $post_id,
            'title'    => wp_strip_all_tags(get_the_title()),
            'excerpt'  => wp_strip_all_tags(get_the_excerpt()),
            'category' => wp_strip_all_tags($cat_name),
            'date'     => get_the_date('c'),
            'author'   => wp_strip_all_tags(get_the_author()),
            'image'    => $thumb_url,
            'href'     => get_permalink(),
        ];
    }
    wp_reset_postdata();
}

$config = [
    'wpApiBase' => home_url(),
    'berita'    => $berita,
];
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://api.fontshare.com" />
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
  <link href="https://api.fontshare.com/v2/css?f[]=dancing-script@400,700,1&display=swap" rel="stylesheet" />
  <?php
  // Enqueue CSS dari manifest (jika ada). wp_head tetap dipanggil untuk plugin/SEO.
  if (is_array($entry) && !empty($entry['css'])) {
      foreach ($entry['css'] as $i => $css_file) {
          echo '<link rel="stylesheet" href="' . esc_url($landing_uri . '/' . $css_file) . '" />' . "\n";
      }
  }
  wp_head();
  ?>
</head>
<body <?php body_class('smkit-landing'); ?>>
  <?php wp_body_open(); ?>

  <div id="root"></div>

  <script>
    window.__SMKIT__ = <?php echo wp_json_encode($config, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
  </script>

  <?php
  if (is_array($entry) && !empty($entry['file'])) {
      echo '<script type="module" src="' . esc_url($landing_uri . '/' . $entry['file']) . '"></script>' . "\n";
  } else {
      echo '<!-- Manifest build tidak ditemukan. Pastikan folder landing/ berisi hasil `npm run build`. -->';
  }

  wp_footer();
  ?>
</body>
</html>
