<?php if ( ! defined( 'ABSPATH' ) ) { die; } // Cannot access directly.
/**
 *
 * Field: icon
 *
 * @since 1.0.0
 * @version 1.0.0
 *
 */
if( ! class_exists( 'CSF_Field_icon' ) ) {
  class CSF_Field_icon extends CSF_Fields {

    public function __construct( $field, $value = '', $unique = '', $where = '', $parent = '' ) {
      parent::__construct( $field, $value, $unique, $where, $parent );
    }

    public function render() {

      $args = wp_parse_args( $this->field, array(
        'button_title' => esc_html__( '添加图标', 'csf' ),
        'remove_title' => esc_html__( '移除图标', 'csf' ),
      ) );

      echo $this->field_before();

      $nonce  = wp_create_nonce( 'csf_icon_nonce' );
      $hidden = ( empty( $this->value ) ) ? ' hidden' : '';

      echo '<div class="csf-icon-select">';
      echo '<span class="csf-icon-preview'. $hidden .'"><i class="'. $this->value .'"></i></span>';
      echo '<a href="#" class="button button-primary csf-icon-add" data-nonce="'. $nonce .'">'. $args['button_title'] .'</a>';
      echo '<a href="#" class="button csf-warning-primary csf-icon-remove'. $hidden .'">'. $args['remove_title'] .'</a>';
      echo '<input type="text" name="'. $this->field_name() .'" value="'. $this->value .'" class="csf-icon-value"'. $this->field_attributes() .' />';
      echo '</div>';

      echo $this->field_after();

    }

  }
}
