<template>
  <div class="database-detail-page">
    <div class="container">
      <nuxt-link to="/database" class="breadcumb bd1">
        <span class="material-icons">
          chevron_left
        </span>

        กลับหน้ารวมมติ ครม.
      </nuxt-link>

      <div class="card">
        <div class="left">
          <div class="item">
            <div class="bd1 label">วันที่ออกมติ</div>

            <div class="bd1 value">{{ data.date }}</div>
          </div>

          <div class="item">
            <div class="bd1 label">ออกมติโดย</div>

            <div class="bd1 value">{{ data.minister_name }}</div>
          </div>

          <div class="item">
            <div class="bd1 label">ตำแหน่ง/กระทรวง</div>

            <div v-if="data.position" class="bd1 value tag tag-grey">
              {{ data.position }}
            </div>

            <div v-else class="bd1 value">-</div>
          </div>

          <div class="item">
            <div class="bd1 label">หมวดหมู่</div>

            <div v-if="data.category" class="bd1 value tag tag-green">
              {{ data.category }}
            </div>

            <div v-else class="bd1 value">-</div>
          </div>

          <div class="item">
            <div class="bd1 label">ลิงก์เอกสาร</div>

            <a
              v-if="data.comfirmation_doc_link != '-'"
              :href="data.comfirmation_doc_link"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <h6>
                เอกสาร เสนอมติ
              </h6>
            </a>

            <a
              v-if="data.propasal_doc_link != '-'"
              :href="data.propasal_doc_link"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <h6>
                เอกสาร ความก้าวหน้าของมติ
              </h6>
            </a>
          </div>
        </div>

        <div class="right">
          <div class="item">
            <div class="label bd1">
              ชื่อมติ
            </div>

            <h3 class="value">{{ data.main_topic }}</h3>
          </div>

          <div class="item">
            <div class="label bd1">
              ผลลัพธ์
            </div>

            <div class="value bd1">{{ data.result }}</div>
          </div>
        </div>
      </div>

      <div class="table-wrap">
        <h4>สุ่มมติอื่นๆ ในหมวดเดียวกัน</h4>

        <TableList :data="other_data" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["two_years_data", "covid_data"]),
    data() {
      const all_data = [...this.two_years_data, ...this.covid_data];
      const data = _.find(all_data, d => d.no == this.$route.query.id);

      return data || {};
    },
    other_data() {
      const all_data = [...this.two_years_data, ...this.covid_data];
      let data = _.filter(all_data, d => d.category === this.data.category);
      data = _.shuffle(data);
      data.length = 5;

      return data;
    }
  },
  watch: {
    "$route.query"() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.database-detail-page {
  background: $color-light-grey-2;
  padding: 70px 0;
  @include media-breakpoint(tablet) {
    padding: 32px 0;
    background: white;
  }
  .breadcumb {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $color-dark-green;
    .material-icons {
      margin-right: 10px;
    }
  }
  .card {
    display: flex;
    border: 1px solid $color-dark-green;
    border-radius: 8px;
    background: white;
    padding: 24px;
    margin-top: 16px;
    @include media-breakpoint(tablet) {
      background: none;
      border: none;
      padding: 0;
      flex-direction: column-reverse;
    }
    .left {
      padding: 16px;
      width: 314px;
      background: $color-pale-green-2;
      flex: none;
      @include media-breakpoint(tablet) {
        width: 100%;
        margin-top: 40px;
      }
      .item {
        margin-top: 32px;
        .label {
          font-weight: bold;
        }
        .value {
          margin-top: 8px;
        }
        .tag {
          background: #ffffff;
          border-radius: 5px;
          padding: 8px 12px;
          display: inline-block;
        }
        .tag-grey {
          border: 1px solid $color-grey-4;
        }
        .tag-green {
          border: 1px solid $color-green;
        }
        a {
          text-decoration: none;
          border: 1px solid $color-dark-green;
          border-radius: 5px;
          display: block;
          color: $color-dark-green;
          padding: 16px;
          text-align: center;
          margin-top: 8px;
          h6 {
            margin: 0;
            font-weight: normal;
          }
        }
      }
      .item:first-child {
        margin: 0;
      }
    }
    .right {
      padding: 0 24px;
      @include media-breakpoint(tablet) {
        margin-top: 24px;
        padding: 0;
      }
      .item {
        margin-top: 24px;
        .label {
          color: $color-green;
        }
        .value {
          margin-top: 8px;
        }
      }
      .item:first-child {
        margin: 0;
      }
    }
  }
  .table-wrap {
    margin-top: 48px;
    @include media-breakpoint(tablet) {
      margin-top: 40px;
    }
    h4 {
      margin: 0;
    }
    .table-list {
      margin-top: 32px;
      @include media-breakpoint(tablet) {
        margin-top: 0;
      }
    }
  }
}
</style>
