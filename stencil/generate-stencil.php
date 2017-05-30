<?php
/**
 * Creates a Pencil Stencil Definition for Font-Awesome icons.
 *
 * @see https://github.com/FortAwesome/Font-Awesome
 * @see https://code.google.com/p/evoluspencil/
 */

// input/output resources
$font_awesome_css        = __DIR__ . '/../css/font-awesome.css';
$fontawesome_webfont_svg = __DIR__ . '/../font/fontawesome-webfont.svg';
$definition_xml          = __DIR__ . '/Definition.xml';
$stencil_name            = 'Font-Awesome-2.0';
$stencil_zip             = __DIR__ . '/'.$stencil_name.'.zip';

// fetch names from CSS
$css = explode("\n", file_get_contents($font_awesome_css));
$pattern = '/^\\.(icon-[^:]+):before\\s*\\{\\s*content:\\s*"([^"]+)"/';
$names = array();
foreach ($css as $n => $l) {
    //echo ''.print_r($l, true)."\n";
    if (preg_match($pattern, $l, $m)) {
        $char = $m[2];
        if (preg_match('/^\\\\([0-9a-zAA-Z]{4})$/', $char, $m2)) {
            //$char = pack("H*", $m2[1]);
            $char = $m2[1];
        }
        $names[$char] = $m[1];
    }
}
asort($names);
//echo '$names: '.print_r($names, true)."\n";


// fetch glyphes from SVG font
$fontDoc = simplexml_load_file($fontawesome_webfont_svg);
$font = $fontDoc->defs->font[0];
$fontFace = $font->{"font-face"}[0];

$glyphes = array();
foreach ($font->glyph as $glyph) {
    if ($glyph['unicode'] && $glyph['d'] && (string) $glyph['d'] !== "M0 0z") {
        $char = (string) $glyph['unicode'];
        $char = mb_encode_numericentity ($char, array (0x00, 0xffff, 0, 0xffff), 'UTF-8');
        // &#57344; => &#xe000;
        if (preg_match('/^&#([0-9]+);$/', $char, $m)) {
            $char = dechex($m[1]);
        }
        $glyphes[$char] = $glyph;
    }
}

//echo '$glyphes: '.print_r($glyphes, true)."\n";
// create a {name => glyph} map
$glyphesMap = array();
foreach ($names as $k => $name) {
    if (! isset($glyphes[$k])) {
        echo "WARNING: Could not find glyph for $name.\n";
        continue;
    }
    $glyphesMap[$name] = $glyphes[$k];
}
//echo '$glyphesMap: '.print_r($glyphesMap, true)."\n";

ob_start();

echo '<?xml version="1.0" encoding="utf-8"?'.'>';

echo '
<Shapes xmlns="http://www.evolus.vn/Namespace/Pencil"
    xmlns:p="http://www.evolus.vn/Namespace/Pencil"
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="Font-Awesome"
    displayName="Font Awesome"
    author="Dave"
    url="http://fortawesome.github.com/Font-Awesome/"
    description="The iconic font designed for use with Twitter Bootstrap

The full suite of pictographic icons, examples, and documentation can be found at:
http://fortawesome.github.com/Font-Awesome/

##Contact
- Email: dave@davegandy.com
- Twitter: http://twitter.com/fortaweso_me
- Work: Lead Product Designer @ http://kyru.us

##License
Version 2.0 of the Font Awesome font, CSS, and LESS files are licensed under CC BY 3.0:
http://creativecommons.org/licenses/by/3.0/
A mention of \'Font Awesome - http://fortawesome.github.com/Font-Awesome\'
in human-readable source code is considered acceptable attribution (most common on the
web). If human readable source code is not available to the end user, a mention in an \'About\'
or \'Credits\' screen is considered acceptable (most common in desktop or mobile software).

##Stencil transformation by Guillaume
">

<!-- 
    ###########################################################
    #  THIS FILE IS GENERATED!                                #
    #  DO NOT WASTE YOUR TIME EDITING!                        #
    ###########################################################
-->

    <Properties>
        <PropertyGroup name="Colors">
            <Property name="color" type="Color" displayName="Color">#333333FF</Property>
            <Property name="disabledColor" type="Color" displayName="disabledColor">#AAAAAAFF</Property>
        </PropertyGroup>
    </Properties>

';



foreach ($glyphesMap as $name => $glyph) {

    $d = (string) $glyph['d'];

    $units_per_em = intval((string) $fontFace["units-per-em"]);
    $ascent       = intval((string) $fontFace["ascent"]);
    $descent      = intval((string) $fontFace["descent"]);
    $descent      = abs($descent); // seems like some font encoder make negative descent

    // fixes position for some icons
    switch ($name) {
        case 'icon-hand-down':
            $ascent  -= $units_per_em / 4.4;
            $descent += $units_per_em / 4.4;
            break;
        case 'icon-thumbs-down':
            $ascent  -= $units_per_em / 3.6;
            $descent += $units_per_em / 3.6;
            break;
        case 'icon-hand-up':
            $ascent  -= $units_per_em / 8;
            $descent += $units_per_em / 8;
            break;
        default:
        continue;
    }

    $width  = 32;
    $height = 32;

    if ($glyph['horiz-adv-x']) {
        $horiz_adv_x = intval((string) $glyph['horiz-adv-x']);
    } else {
        $horiz_adv_x = intval((string) $font["horiz-adv-x"]);
    }

    // coordinates in fonts are inversed
    $translateX = ($units_per_em - $horiz_adv_x) / 2;
    $translateY = $units_per_em - ($descent / 2);
    $transform = 'translate('.$translateX.', '.$translateY.') scale(1,-1)';

    $viewBoxW = $units_per_em;
    $viewBoxH = $units_per_em;

    $svg = '<svg xmlns="http://www.w3.org/2000/svg" id="glyph" width="'.$width.'" height="'.$height.'" viewBox="0 0 '.$viewBoxW.' '.$viewBoxH.'"><path d="'.htmlspecialchars($d).'" transform="'.htmlspecialchars($transform).'" /></svg>';

    // full rawurlencode is too much...
    $icon = 'data:image/svg+xml;charset=utf8,' . str_replace(
        array('%',   '#',   '?'),
        array('%25', '%23', '%3F'),
        $svg
    );

    echo '

    <Shape id="'.htmlspecialchars($name).'" displayName="'.htmlspecialchars($name).'" icon="'.htmlspecialchars($icon).'">
        <Properties>
            <PropertyGroup>
                <Property name="box" type="Dimension" displayName="Size" p:lockRatio="true">32,32</Property>
                <Property name="disabled" displayName="Disabled" type="Bool">false</Property>
            </PropertyGroup>
            <PropertyGroup name="Colors">
                <Property name="color" type="Color" displayName="Color"><E>$$color</E></Property>
                <Property name="disabledColor" type="Color" displayName="Disabled Color"><E>$$disabledColor</E></Property>
            </PropertyGroup>
        </Properties>
        <Behaviors>
            <For ref="glyph">
                <Box>$box</Box>
                <Disabled></Disabled>
                <Fill>$disabled.value ? $disabledColor : $color</Fill>
            </For>
        </Behaviors>
        <Content>
            '.$svg.'
        </Content>
    </Shape>';

}

echo '
</Shapes>
';


file_put_contents($definition_xml, ob_get_clean());

if (class_exists('ZipArchive')) {
    if (file_exists($stencil_zip)) {
        unlink($stencil_zip);
    }
    $zip = new ZipArchive();
    if ($zip->open($stencil_zip, ZIPARCHIVE::CREATE) === true) {
        $zip->addFile($definition_xml, $stencil_name . '/' . basename('Definition.xml'));
        $zip->close();
    }
}
