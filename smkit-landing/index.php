<?php
/**
 * Fallback template.
 * Landing utama ditangani oleh front-page.php.
 */

if (!defined('ABSPATH')) {
    exit;
}

$front = __DIR__ . '/front-page.php';
if (file_exists($front)) {
    require $front;
    return;
}

get_header();
?>
<main id="primary" class="site-main">
  <p>Template landing tidak ditemukan.</p>
</main>
<?php
get_footer();