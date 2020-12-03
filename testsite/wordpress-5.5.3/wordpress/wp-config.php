<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'testsite' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '#7m-0,>OGr|@WbdT`ms Lwg J@g{tG1R)O2,O:T~w62jaggI$|[Y~D4jUx,;ZkI%' );
define( 'SECURE_AUTH_KEY',  'm/TH)Sor^`^Zb6ycet[/yw(70iT/}9VWr!Zl}6WtK)@y/CL5 rfDp 6D9#`e@y>7' );
define( 'LOGGED_IN_KEY',    '3QGvT!Mw*g_hmk%+*+lL:f@b4~5v[<60[N49W]pceDEl_Srgi%VRd~2hz !j:>Nm' );
define( 'NONCE_KEY',        'IumuV;j#,v:35L|FM>HJ&C[n5}M.A<SO~KoRLbc!_59:59=Lw+({cK@U7bhXAL37' );
define( 'AUTH_SALT',        'w9{C*YJY51z,i:gMCLk~-!cHe[)Y?FED1#x5{ayKoYI9*wI|]g/-4T+c9/iI}jLP' );
define( 'SECURE_AUTH_SALT', '[J2[<-Lj}l<.rRtRD_J00`*37RM~dHDO$RD>h8.LCLXfJ:vY,vS4KeE +HN7Zl>v' );
define( 'LOGGED_IN_SALT',   'x:X?qh%y0H+1QmJoYK:5s5uZ)9zpOjh.F$Bx831F0EfluIy;uATs|Ioq,F7r.Ns{' );
define( 'NONCE_SALT',       '#pbvGLqvq1s^]E ( ~rWJ_p@V758D `;Xca/j(_VpLVee%(LFGJCpMWDxo$KJk_Q' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
