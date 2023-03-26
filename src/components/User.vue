<template>
  <div
    class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center uk-margin-small-top uk-box-shadow-xlarge"
  >
    <div v-if="user">
      <h3 class="uk-card-title uk-margin-remove-top">{{ user.name }}</h3>
      <hr class="uk-divider-small" />
      <p>
        <span class="uk-margin-small-right" uk-icon="icon: mail"></span>
        <strong>Email:</strong> {{ user.email }}
      </p>
      <p>
        <span class="uk-margin-small-right" uk-icon="icon: receiver"></span>
        <strong>Телефон:</strong> +{{ user.phone }}
      </p>
      <p>
        <span class="uk-margin-small-right" uk-icon="icon: user"></span>
        <strong>Псевдоним:</strong> {{ user.nickName }}
      </p>
      <p>
        <span class="uk-margin-small-right" uk-icon="icon: location"></span>
        <strong>IP-адрес:</strong> {{ user.ip }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
