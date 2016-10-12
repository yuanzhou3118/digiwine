<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\Note
 *
 * @property integer $id
 * @property string $content
 * @property string $imga
 * @property string $imgb
 * @property string $imgc
 * @property string $wine_name
 * @property string $grape_varieties
 * @property string $place_of_origin
 * @property string $price
 * @property string $years
 * @property integer $score
 * @property string $color
 * @property string $aroma_characteristic
 * @property string $flavor_characteristics
 * @property integer $acid
 * @property integer $tannic
 * @property integer $texture
 * @property integer $wine_body
 * @property integer $sweetness
 * @property integer $aftertaste
 * @property integer $note_likes
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereImga($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereImgb($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereImgc($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereWineName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereGrapeVarieties($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note wherePlaceOfOrigin($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note wherePrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereYears($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereScore($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereColor($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereAromaCharacteristic($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereFlavorCharacteristics($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereAcid($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereTannic($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereTexture($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereWineBody($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereSweetness($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereAftertaste($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereNoteLikes($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereUpdatedAt($value)
 * @property integer $user_id
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereUserId($value)
 * @property string $country
 * @property integer $status
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereCountry($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereStatus($value)
 * @property string $aroma_characteristics
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Note whereAromaCharacteristics($value)
 */

class Note extends Model
{
    protected $table = 'notes';

    protected $guarded = ['id', 'created_at', 'updated_at'];
}
